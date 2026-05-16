import React from "react";
import { z } from "zod";
import {
  HeroPropsSchema,
  FeatureGridPropsSchema,
  TestimonialPropsSchema,
  CTAPropsSchema,
} from "@/lib/schema";

type HeroProps = z.infer<typeof HeroPropsSchema>;
type FeatureGridProps = z.infer<typeof FeatureGridPropsSchema>;
type TestimonialProps = z.infer<typeof TestimonialPropsSchema>;
type CTAProps = z.infer<typeof CTAPropsSchema>;

export const UnsupportedSection = ({ type }: { type: string }) => (
  <div className="p-8 border-2 border-dashed border-red-500 rounded-lg bg-red-50 text-red-700">
    <h2 className="text-xl font-bold">Unsupported Section</h2>
    <p>
      The section type <code>{type}</code> is not supported by this renderer.
    </p>
  </div>
);

export const Hero = ({
  title,
  subtitle,
  ctaLabel,
  ctaUrl,
  textColor,
  backgroundColor,
}: HeroProps & { textColor?: string; backgroundColor?: string }) => (
  <section
    className="py-20 px-6 text-center rounded-3xl overflow-hidden my-8 transition-colors"
    style={{
      color: textColor || "#ffffff",
      backgroundColor: backgroundColor || "rgb(79 70 229)",
    }}>
    <h1
      className="text-5xl font-extrabold mb-4 tracking-tight"
      style={{ color: textColor || "#ffffff" }}>
      {title}
    </h1>
    {subtitle && (
      <p
        className="text-xl mb-8 max-w-2xl mx-auto"
        style={{ color: textColor || "#ffffff" }}>
        {subtitle}
      </p>
    )}
    {ctaLabel && (
      <a
        href={ctaUrl}
        className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all">
        {ctaLabel}
      </a>
    )}
  </section>
);

export const FeatureGrid = ({
  title,
  features,
  textColor,
  backgroundColor,
}: FeatureGridProps & { textColor?: string; backgroundColor?: string }) => (
  <section
    className="py-16 px-6 transition-colors"
    style={{
      color: textColor || "inherit",
      backgroundColor: backgroundColor || "transparent",
    }}>
    {title && (
      <h2
        className="text-3xl font-bold mb-10 text-center"
        style={{ color: textColor || "inherit" }}>
        {title}
      </h2>
    )}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features?.map((f, i) => (
        <div
          key={i}
          className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{f.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export const Testimonial = ({ testimonials }: TestimonialProps) => (
  <section className="py-16 px-6 bg-slate-50 dark:bg-slate-950 rounded-3xl my-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials?.map((t, i) => (
        <blockquote
          key={i}
          className="p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <p className="text-lg italic mb-4 text-slate-700 dark:text-slate-300">
            &quot;{t.quote}&quot;
          </p>
          <cite className="not-italic font-bold text-indigo-600">
            &mdash; {t.author}
            {t.role ? `, ${t.role}` : ""}
          </cite>
        </blockquote>
      ))}
    </div>
  </section>
);

export const CTA = ({
  title,
  description,
  buttonLabel,
  buttonUrl,
  textColor,
  backgroundColor,
}: CTAProps & { textColor?: string; backgroundColor?: string }) => (
  <section
    className="py-16 px-6 text-center rounded-3xl my-8 transition-colors"
    style={{
      color: textColor || "#ffffff",
      backgroundColor: backgroundColor || "rgb(15 23 42)",
    }}>
    <h2
      className="text-3xl font-bold mb-4"
      style={{ color: textColor || "#ffffff" }}>
      {title}
    </h2>
    {description && (
      <p
        className="text-slate-400 mb-8 max-w-xl mx-auto"
        style={{ color: textColor || "rgba(255,255,255,0.7)" }}>
        {description}
      </p>
    )}
    <a
      href={buttonUrl}
      className="inline-block bg-indigo-500 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-400 transition-all">
      {buttonLabel}
    </a>
  </section>
);
