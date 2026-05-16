import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-white rounded-2xl shadow-xl border border-slate-100">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-4">
          <ShieldAlert size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Access Denied
        </h1>
        <p className="text-slate-600 leading-relaxed">
          Your current role does not have permission to access the Page Studio.
          Please contact your administrator if you believe this is an error.
        </p>
        <div className="pt-4 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
            Back to Dashboard
          </Link>
          <p className="text-xs text-slate-400">
            Current Session:{" "}
            <span className="font-mono text-slate-500">Viewer Mode</span>
          </p>
        </div>
      </div>
    </div>
  );
}
