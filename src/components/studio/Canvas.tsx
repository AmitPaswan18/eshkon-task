"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { SectionRenderer } from "../sections/SectionRenderer";

export const Canvas = () => {
  const { page } = useSelector((state: RootState) => state.draftPage);
  const { viewport } = useSelector((state: RootState) => state.ui);

  if (!page) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <p className="text-slate-500">Loading page preview...</p>
      </div>
    );
  }

  return (
    <main
      id="main-content"
      className="flex-1 overflow-y-auto bg-slate-100 dark:bg-slate-900 p-8 flex justify-center">
      <div
        className={`w-full transition-all duration-500 ease-in-out bg-white dark:bg-black shadow-2xl rounded-xl h-max overflow-hidden mb-10 motion-reduce:transition-none ${
          viewport === "mobile" ? "max-w-[375px]" : "max-w-full"
        }`}>
        <SectionRenderer sections={page.sections} />
      </div>
    </main>
  );
};
