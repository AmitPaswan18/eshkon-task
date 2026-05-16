import { test, expect } from '@playwright/test';
import { calculateVersionBump, bumpVersion } from '../src/lib/publish/semver';
import { PageSchema } from '../src/lib/schema';

test.describe('Unit Tests: SemVer Logic', () => {
  const mockPage = {
    pageId: 'test-page',
    slug: 'test-page',
    title: 'Test Page',
    sections: [
      { id: '1', type: 'hero', props: { title: 'Hello' } }
    ]
  };

  test('should detect Patch for prop change', () => {
    const updatedPage = {
      ...mockPage,
      sections: [{ ...mockPage.sections[0], props: { title: 'Hello World' } }]
    };
    expect(calculateVersionBump(mockPage as any, updatedPage as any)).toBe('patch');
  });

  test('should detect Minor for section addition', () => {
    const updatedPage = {
      ...mockPage,
      sections: [
        ...mockPage.sections,
        { id: '2', type: 'cta', props: { title: 'Click' } }
      ]
    };
    expect(calculateVersionBump(mockPage as any, updatedPage as any)).toBe('minor');
  });

  test('should detect Major for section removal', () => {
    const updatedPage = {
      ...mockPage,
      sections: []
    };
    expect(calculateVersionBump(mockPage as any, updatedPage as any)).toBe('major');
  });

  test('should correctly bump versions', () => {
    expect(bumpVersion('1.0.0', 'patch')).toBe('1.0.1');
    expect(bumpVersion('1.0.0', 'minor')).toBe('1.1.0');
    expect(bumpVersion('1.0.0', 'major')).toBe('2.0.0');
  });
});

test.describe('Unit Tests: Schema Validation', () => {
  test('should validate a correct page', () => {
    const validPage = {
      pageId: '1',
      slug: 'test',
      title: 'Title',
      sections: [
        { id: 's1', type: 'hero', props: { title: 'Hero' } }
      ]
    };
    expect(() => PageSchema.parse(validPage)).not.toThrow();
  });

  test('should fail on invalid section type', () => {
    const invalidPage = {
      id: '1',
      slug: 'test',
      title: 'Title',
      sections: [
        { id: 's1', type: 'unknown-type', props: {} }
      ]
    };
    expect(() => PageSchema.parse(invalidPage)).toThrow();
  });
});
