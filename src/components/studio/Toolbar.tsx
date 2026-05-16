"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { setRole, setViewport } from "@/lib/store/slices/uiSlice";
import { savePage } from "@/lib/store/slices/draftPageSlice";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { calculateVersionBump, bumpVersion } from "@/lib/publish/semver";
import {
  startPublishing,
  finishPublishing,
} from "@/lib/store/slices/publishSlice";
import {
  Monitor,
  Smartphone,
  Save,
  Send,
  User,
  ChevronDown,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Toolbar = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const slug = params.slug as string;

  const { role, viewport } = useSelector((state: RootState) => state.ui);
  const { page, originalPage, hasUnsavedChanges } = useSelector(
    (state: RootState) => state.draftPage,
  );
  const { currentVersion, isPublishing } = useSelector(
    (state: RootState) => state.publish,
  );

  const handleSave = () => {
    dispatch(savePage());
    toast.success("Changes saved successfully");
  };

  const updateRole = (newRole: "viewer" | "editor" | "publisher") => {
    dispatch(setRole(newRole));
    // Set cookie for middleware enforcement
    document.cookie = `user-role=${newRole}; path=/; max-age=3600`;
    toast.success(`Role changed to ${newRole}`);

    // Redirect if viewer and in studio
    if (
      newRole === "viewer" &&
      window.location.pathname.startsWith("/studio")
    ) {
      window.location.href = `/preview/${slug}`;
    }
  };

  const handlePublish = async () => {
    if (!page) return;

    const bump = calculateVersionBump(originalPage, page);
    if (bump === "none") {
      toast.info("No changes to publish", {
        description: "Your draft matches the last published version.",
      });
      return;
    }

    const nextVersion = bumpVersion(currentVersion, bump);

    dispatch(startPublishing());

    try {
      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftPage: page,
          originalPage: originalPage,
          currentVersion: currentVersion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to publish");
      }

      const data = await response.json();

      const release = {
        version: data.version,
        slug,
        timestamp: new Date().toISOString(),
        snapshot: JSON.parse(JSON.stringify(page)),
        changelog: `Published version ${data.version} (${data.bump} bump)`,
      };

      dispatch(finishPublishing(release));
      dispatch(savePage());

      toast.success(`Version ${data.version} Published`, {
        description: `Detected a ${data.bump} change. Snapshot saved to backend.`,
      });
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("Publishing failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    }
  };

  return (
    <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-indigo-600 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            P
          </div>
          <span>Studio</span>
          {currentVersion !== "0.0.0" && (
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-200">
              v{currentVersion}
            </span>
          )}
        </Link>
        <Separator orientation="vertical" className="h-6" />
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Desktop viewport"
            className={`h-8 w-8 p-0 ${viewport === "desktop" ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"}`}
            onClick={() => dispatch(setViewport("desktop"))}>
            <Monitor size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Mobile viewport"
            className={`h-8 w-8 p-0 ${viewport === "mobile" ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"}`}
            onClick={() => dispatch(setViewport("mobile"))}>
            <Smartphone size={16} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="group flex items-center gap-2 px-3 h-10 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm"
              aria-label={`Current role is ${role}. Click to change role.`}>
              <User size={16} className="text-slate-500" />
              <span className="capitalize text-slate-700 dark:text-slate-200">
                {role}
              </span>
              <ChevronDown
                size={14}
                className="text-slate-400 group-data-[popup-open]:rotate-180 transition-transform"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => updateRole("viewer")}>
                Viewer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateRole("editor")}>
                Editor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateRole("publisher")}>
                Publisher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-slate-600"
            onClick={() => window.open(`/preview/${slug}`, "_blank")}>
            <Eye size={16} />
            Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-label={
              hasUnsavedChanges
                ? "Save changes (unsaved changes present)"
                : "Save changes"
            }
            className={`gap-2 ${hasUnsavedChanges ? "border-indigo-200 bg-indigo-50 dark:bg-indigo-950" : ""}`}
            onClick={handleSave}>
            <Save size={16} />
            Save{" "}
            {hasUnsavedChanges && (
              <span className="text-indigo-600" aria-hidden="true">
                •
              </span>
            )}
          </Button>
          <Button
            disabled={role !== "publisher" || isPublishing}
            size="sm"
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 min-w-[100px]"
            onClick={handlePublish}>
            {isPublishing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin motion-reduce:animate-none" />
            ) : (
              <Send size={16} />
            )}
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </header>
  );
};

interface SeparatorProps {
  orientation: "horizontal" | "vertical";
  className?: string;
}

const Separator = ({ orientation, className }: SeparatorProps) => (
  <div
    role="separator"
    aria-orientation={orientation}
    className={`bg-slate-200 dark:bg-slate-800 ${orientation === "vertical" ? "w-px" : "h-px"} ${className || ""}`}
  />
);
