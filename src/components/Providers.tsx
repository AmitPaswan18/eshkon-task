"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";

import { useEffect } from "react";
import { setPage } from "@/lib/store/slices/draftPageSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load persisted state
    const saved = localStorage.getItem("page-studio-draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.page) {
          store.dispatch(setPage(parsed.page));
        }
      } catch (e) {
        console.error("Failed to hydrate state:", e);
      }
    }

    // Persist state on changes
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem(
        "page-studio-draft",
        JSON.stringify(state.draftPage),
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      {children}
      <Toaster richColors position="top-right" />
    </Provider>
  );
}
