import { NextRequest, NextResponse } from 'next/server';
import { calculateVersionBump, bumpVersion } from '@/lib/publish/semver';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { draftPage, originalPage, currentVersion = '0.0.0' } = await request.json();

    if (!draftPage) {
      return NextResponse.json({ error: 'No draft page provided' }, { status: 400 });
    }

    const bump = calculateVersionBump(originalPage, draftPage);
    
    if (bump === 'none') {
      return NextResponse.json({ message: 'No changes to publish', version: currentVersion });
    }

    const newVersion = bumpVersion(currentVersion, bump);
    const slug = draftPage.slug;

    // Save snapshot to local filesystem (simulating immutable release storage)
    const releasesDir = path.join(process.cwd(), 'releases', slug);
    await fs.mkdir(releasesDir, { recursive: true });

    const snapshot = {
      version: newVersion,
      timestamp: new Date().toISOString(),
      page: draftPage,
      bump,
    };

    const filePath = path.join(releasesDir, `${newVersion}.json`);
    await fs.writeFile(filePath, JSON.stringify(snapshot, null, 2));

    return NextResponse.json({
      success: true,
      version: newVersion,
      bump,
      snapshotPath: `/releases/${slug}/${newVersion}.json`,
    });
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
