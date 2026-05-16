import { SectionType } from '@/lib/schema';
import { Hero, FeatureGrid, Testimonial, CTA, UnsupportedSection } from './SectionComponents';

export const SECTION_REGISTRY: Record<SectionType, React.ComponentType<Record<string, unknown>>> = {
  hero: Hero,
  featureGrid: FeatureGrid,
  testimonial: Testimonial,
  cta: CTA,
};

export const getSectionComponent = (type: string) => {
  return SECTION_REGISTRY[type as SectionType] || UnsupportedSection;
};
