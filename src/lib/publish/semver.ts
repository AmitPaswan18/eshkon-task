import { Page } from '../schema';

export type VersionType = 'patch' | 'minor' | 'major' | 'none';

export function calculateVersionBump(oldPage: Page | null, newPage: Page): VersionType {
  if (!oldPage) return 'major'; // Initial publish is major (1.0.0)

  const oldSections = oldPage.sections;
  const newSections = newPage.sections;

  // 1. Check for Major changes: remove section or change type
  if (newSections.length < oldSections.length) return 'major';
  
  for (let i = 0; i < oldSections.length; i++) {
    const oldSec = oldSections[i];
    const newSec = newSections.find(s => s.id === oldSec.id);
    
    if (!newSec) return 'major'; // Removed section
    if (newSec.type !== oldSec.type) return 'major'; // Changed type
  }

  // 2. Check for Minor changes: add section
  if (newSections.length > oldSections.length) return 'minor';

  // 3. Check for Patch changes: prop change
  let hasPropChange = false;
  for (const newSec of newSections) {
    const oldSec = oldSections.find(s => s.id === newSec.id);
    if (JSON.stringify(newSec.props) !== JSON.stringify(oldSec?.props)) {
      hasPropChange = true;
      break;
    }
  }

  return hasPropChange ? 'patch' : 'none';
}

export function bumpVersion(currentVersion: string, bump: VersionType): string {
  if (bump === 'none') return currentVersion;
  
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  switch (bump) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return currentVersion;
  }
}
