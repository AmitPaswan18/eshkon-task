import React from "react";
import Link from "next/link";
import {
  Layout,
  Eye,
  Settings,
  Zap,
  ShieldCheck,
  ArrowRight,
  Monitor,
  Database,
  Accessibility,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <nav className="h-16 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            P
          </div>
          <span>Page Studio</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/studio/test-page"
            className="text-sm font-medium hover:text-indigo-600 transition-colors">
            Studio
          </Link>
          <Link
            href="/preview/test-page"
            className="text-sm font-medium hover:text-indigo-600 transition-colors">
            Preview
          </Link>
          <Link
            href="/quality"
            className="text-sm font-medium hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            Quality
          </Link>
          <a
            href="https://github.com/AmitPaswan18/eshkon-task"
            target="_blank"
            className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            GitHub
          </a>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
            <Zap size={14} />
            <span>Next-Generation Page Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 dark:from-white dark:via-indigo-400 dark:to-white bg-clip-text text-transparent leading-tight">
            Design high-performance landing pages with precision.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            A schema-driven editor built for speed, accessibility, and
            type-safety. Empower your team to build faster without breaking
            things.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/studio/test-page"
              className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 hover:-translate-y-1">
              <Layout size={20} />
              Open Studio
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/preview/test-page"
              className="flex items-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 px-8 py-4 rounded-2xl font-bold text-lg hover:border-indigo-600 dark:hover:border-indigo-500 transition-all hover:-translate-y-1">
              <Eye size={20} />
              View Preview
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6 bg-white dark:bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">
              Everything you need in a modern CMS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Database className="text-blue-500" />}
                title="Schema Driven"
                description="Built on Zod. Every section is validated at the boundary, ensuring your production site never breaks."
              />
              <FeatureCard
                icon={<Accessibility className="text-green-500" />}
                title="Accessibility First"
                description="Meets WCAG 2.2 AAA standards. High contrast, keyboard navigation, and semantic HTML out of the box."
              />
              <FeatureCard
                icon={<ShieldCheck className="text-purple-500" />}
                title="SemVer Publishing"
                description="Automatic versioning logic. We calculate if your change is a Patch, Minor, or Major bump based on the diff."
              />
              <FeatureCard
                icon={<Zap className="text-yellow-500" />}
                title="High Performance"
                description="Leveraging Next.js App Router for server-side rendering and static optimization."
              />
              <FeatureCard
                icon={<Layout className="text-pink-500" />}
                title="Redux State"
                description="Robust state management with Redux Toolkit. Handles complex section reordering and prop editing."
              />
              <FeatureCard
                icon={<Monitor className="text-indigo-500" />}
                title="Responsive Canvas"
                description="Test your designs instantly with built-in desktop and mobile viewports in the studio."
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Ready to build your next landing page?
              </h2>
              <p className="text-indigo-100 text-lg mb-10 max-w-lg mx-auto opacity-90">
                Experience the power of a schema-driven studio. No more broken
                layouts, just pure performance.
              </p>
              <Link
                href="/studio/test-page"
                className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-opacity-90 transition-all shadow-lg">
                Launch Test Page Studio
              </Link>
            </div>
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400 opacity-20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
        <p>
          &copy; 2024 Page Studio. Built with Next.js, Redux, and Contentful.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group">
      <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
