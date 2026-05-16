import React from "react";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Activity,
  Accessibility,
  Cpu,
  XCircle,
  Clock,
  Terminal,
} from "lucide-react";

export default async function QualityDashboard() {
  let report = null;
  const testSummary = {
    passed: 0,
    failed: 0,
    total: 0,
    duration: 0,
  };
  const testDetails: any[] = [];

  try {
    const reportPath = path.join(process.cwd(), "a11y-report.json");
    const data = await fs.readFile(reportPath, "utf8");
    report = JSON.parse(data);

    // Parse Playwright JSON format
    if (report && report.suites) {
      report.suites.forEach((suite: any) => {
        suite.specs?.forEach((spec: any) => {
          spec.tests?.forEach((test: any) => {
            testSummary.total++;
            const result = test.results?.[0];
            const status = result?.status || "unknown";

            if (status === "passed") testSummary.passed++;
            else if (status === "failed") testSummary.failed++;

            testDetails.push({
              title: spec.title,
              suite: suite.title,
              status: status,
              duration: result?.duration || 0,
              error: result?.error?.message,
            });
          });
        });

        // Handle nested suites
        suite.suites?.forEach((subSuite: any) => {
          subSuite.specs?.forEach((spec: any) => {
            spec.tests?.forEach((test: any) => {
              testSummary.total++;
              const result = test.results?.[0];
              const status = result?.status || "unknown";

              if (status === "passed") testSummary.passed++;
              else if (status === "failed") testSummary.failed++;

              testDetails.push({
                title: spec.title,
                suite: subSuite.title,
                status: status,
                duration: result?.duration || 0,
                error: result?.errors?.[0]?.message || result?.error?.message,
              });
            });
          });
        });
      });
    }
  } catch (e) {
    console.error("Report parsing error:", e);
  }

  const allPassed = testSummary.total > 0 && testSummary.failed === 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-white dark:hover:bg-slate-900 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Quality Gate Dashboard
              </h1>
              <p className="text-slate-500 text-sm italic">
                Simulated real-time CI status
              </p>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full flex items-center gap-2 font-bold ${allPassed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
            {allPassed ? <CheckCircle2 size={18} /> : <Activity size={18} />}
            <span>{allPassed ? "BUILD PASSING" : "ATTENTION REQUIRED"}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={<Cpu className="text-blue-500" />}
            title="Total Tests"
            value={testSummary.total.toString()}
          />
          <StatCard
            icon={<CheckCircle2 className="text-emerald-500" />}
            title="Passed"
            value={testSummary.passed.toString()}
            status="success"
          />
          <StatCard
            icon={<XCircle className="text-rose-500" />}
            title="Failed"
            value={testSummary.failed.toString()}
            status={testSummary.failed > 0 ? "danger" : "success"}
          />
          <StatCard
            icon={<ShieldCheck className="text-indigo-500" />}
            title="A11y Grade"
            value={allPassed ? "AAA" : "Pending"}
            status="success"
          />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <h2 className="font-bold flex items-center gap-2">
              <Terminal size={18} className="text-indigo-600" />
              Test Suite Execution Details
            </h2>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} />
              Last run: {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {testDetails.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle
                  size={48}
                  className="mx-auto text-slate-200 mb-4"
                />
                <p className="text-slate-500">
                  No test results found in <code>a11y-report.json</code>
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Run <code>npx playwright test</code> to generate data.
                </p>
              </div>
            ) : (
              testDetails.map((test, i) => (
                <div
                  key={i}
                  className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {test.suite}
                        </span>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${test.status === "passed" ? "bg-emerald-500" : "bg-rose-500"}`}
                        />
                      </div>
                      <h3 className="text-slate-800 dark:text-slate-200 font-medium">
                        {test.title}
                      </h3>
                      {test.error && (
                        <pre className="mt-3 p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-xl text-xs text-rose-700 dark:text-rose-400 overflow-x-auto">
                          {test.error}
                        </pre>
                      )}
                    </div>
                    <div className="text-right whitespace-nowrap">
                      <div
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${test.status === "passed" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {test.status.toUpperCase()}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {test.duration}ms
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  status?: "success" | "warning" | "danger";
}) {
  const statusClasses = {
    success: "border-emerald-100 dark:border-emerald-900/30",
    warning: "border-amber-100 dark:border-amber-900/30",
    danger: "border-rose-100 dark:border-rose-900/30",
  };

  return (
    <div
      className={`bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border ${status ? statusClasses[status] : "border-slate-200 dark:border-slate-800"} flex items-center gap-4`}>
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
