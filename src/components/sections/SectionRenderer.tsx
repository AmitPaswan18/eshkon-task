"use client";

import React from "react";
import { Section } from "@/lib/schema";
import { getSectionComponent } from "./registry";

interface SectionRendererProps {
  sections: Section[];
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  sections,
}) => {
  return (
    <div className="flex flex-col gap-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {sections.map((section) => {
        const Component = getSectionComponent(section.type);
        return (
          <ErrorBoundary
            key={section.id}
            fallback={<SectionError type={section.type} />}>
            <Component {...(section.props as Record<string, unknown>)} />
          </ErrorBoundary>
        );
      })}
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const SectionError = ({ type }: { type: string }) => (
  <div className="p-8 border-2 border-dashed border-orange-500 rounded-lg bg-orange-50 text-orange-700 my-4">
    <h2 className="text-xl font-bold">Rendering Error</h2>
    <p>
      Failed to render section of type <code>{type}</code>. This might be due to
      invalid props.
    </p>
  </div>
);
