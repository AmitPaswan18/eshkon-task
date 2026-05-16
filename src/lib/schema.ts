import { z } from 'zod';

export const SectionTypeSchema = z.enum(['hero', 'featureGrid', 'testimonial', 'cta']);

export const SectionSchema = z.object({
  id: z.string(),
  type: SectionTypeSchema,
  props: z.record(z.unknown()),
});

export const PageSchema = z.object({
  pageId: z.string(),
  slug: z.string(),
  title: z.string(),
  sections: z.array(SectionSchema),
});

export type SectionType = z.infer<typeof SectionTypeSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Page = z.infer<typeof PageSchema>;

// Specific prop schemas for better validation
export const HeroPropsSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
});

export const CTAPropsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  buttonLabel: z.string(),
  buttonUrl: z.string(),
});

export const FeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const FeatureGridPropsSchema = z.object({
  title: z.string().optional(),
  features: z.array(FeatureSchema),
});

export const TestimonialSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export const TestimonialPropsSchema = z.object({
  testimonials: z.array(TestimonialSchema),
});
