import { createClient } from 'contentful';
import { PageSchema, Page } from './schema';

const space = process.env.CONTENTFUL_SPACE_ID || '';
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || '';
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN || '';
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

export const contentfulClient = createClient({
  space,
  accessToken,
  environment,
});

export const previewClient = createClient({
  space,
  accessToken: previewToken,
  host: 'preview.contentful.com',
  environment,
});

export async function getPageBySlug(slug: string, isPreview = false): Promise<Page | null> {
  const client = isPreview ? previewClient : contentfulClient;

  try {
    const response = await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      include: 10,
    });

    if (response.items.length === 0) return null;

    const entry = response.items[0];
    
    // Adapter logic: Transform Contentful entry to our Page schema
    const fields = entry.fields as Record<string, unknown>;
    const rawData = {
      pageId: entry.sys.id,
      slug: fields.slug as string,
      title: fields.title as string,
      sections: ((fields.sections as unknown[] || []).map((section) => {
        const s = section as { sys: { id: string; contentType: { sys: { id: string } } }; fields: Record<string, unknown> };
        return {
          id: s.sys.id,
          type: s.sys.contentType.sys.id as string,
          props: s.fields,
        };
      })),
    };

    // Validate with Zod
    const result = PageSchema.safeParse(rawData);
    if (!result.success) {
      console.error('Validation error for page:', slug, result.error);
      // We still return the data if it's "mostly" valid, or we could throw. 
      // Requirement says "Invalid data does not crash the app".
      return rawData as Page;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching page from Contentful:', error);
    return null;
  }
}
