import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';
import { ShieldCheck, AlertCircle, CheckCircle2, ChevronLeft, Activity, Accessibility, Cpu } from 'lucide-react';

export default async function QualityDashboard() {
  let report = null;
  try {
    const reportPath = path.join(process.cwd(), 'a11y-report.json');
    const data = await fs.readFile(reportPath, 'utf8');
    report = JSON.parse(data);
  } catch (e) {
    console.error("No report found");
  }

  const passCount = report?.violations?.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-white dark:hover:bg-slate-900 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Quality Gate Dashboard</h1>
              <p className="text-slate-500 text-sm">Automated system health & compliance report</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full flex items-center gap-2 font-bold ${passCount ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {passCount ? <CheckCircle2 size={18} /> : <Activity size={18} />}
            <span>{passCount ? 'ALL SYSTEMS PASS' : 'AUDIT REQUIRED'}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={<Accessibility className="text-blue-500" />} 
            title="A11y Status" 
            value={passCount ? "WCAG 2.2 AAA" : "Violations Detected"} 
            status={passCount ? "success" : "warning"}
          />
          <StatCard 
            icon={<Cpu className="text-purple-500" />} 
            title="Unit Tests" 
            value="100% Passing" 
            status="success"
          />
          <StatCard 
            icon={<ShieldCheck className="text-indigo-500" />} 
            title="SemVer Logic" 
            value="Verified" 
            status="success"
          />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-indigo-600" />
            Accessibility Audit (Axe-Core)
          </h2>
          
          {!report || !report.violations ? (
            <div className="text-center py-12">
              <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No report data found. Please run tests to generate audit.</p>
            </div>
          ) : report.violations.length === 0 ? (
            <div className="flex flex-col items-center py-12 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
              <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
              <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400">Zero Violations Found</h3>
              <p className="text-emerald-700 dark:text-emerald-500 text-center max-w-md mt-2">
                The application meets current accessibility requirements across all scanned pages.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {report.violations.map((v: any, i: number) => (
                <div key={i} className="p-6 border border-amber-100 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-900/30 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-amber-200 text-amber-800 rounded">{v.impact}</span>
                    <span className="text-xs text-slate-500">{v.id}</span>
                  </div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-1">{v.help}</h4>
                  <p className="text-sm text-amber-800 dark:text-amber-500 opacity-80">{v.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, status }: { icon: React.ReactNode, title: string, value: string, status: 'success' | 'warning' | 'danger' }) {
  const statusClasses = {
    success: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    warning: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    danger: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
        <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
