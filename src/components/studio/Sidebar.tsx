"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { selectSection } from "@/lib/store/slices/uiSlice";
import {
  updateSectionProps,
  reorderSections,
  addSection,
  removeSection,
} from "@/lib/store/slices/draftPageSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GripVertical,
  History as HistoryIcon,
  Edit3,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state.draftPage);
  const { selectedSectionId } = useSelector((state: RootState) => state.ui);
  const { history } = useSelector((state: RootState) => state.publish);

  const selectedSection = page?.sections.find(
    (s) => s.id === selectedSectionId,
  );

  if (!page) return null;

  return (
    <aside className="w-80 border-l bg-slate-50 dark:bg-slate-950 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b bg-white dark:bg-slate-900">
        <h2 className="font-semibold text-lg">Studio</h2>
        <p className="text-xs text-slate-500">Editing: {page.title}</p>
      </div>

      <Tabs
        defaultValue="edit"
        className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit" className="gap-2">
              <Edit3 size={14} />
              Edit
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <HistoryIcon size={14} />
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="edit"
          className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
            <h3 className="text-xs font-bold uppercase text-slate-500 mb-3">
              Sections
            </h3>
            <div className="space-y-2">
              {page.sections.map((section, index) => (
                <div key={section.id} className="group relative">
                  <button
                    type="button"
                    aria-label={`Select ${section.type} section`}
                    onClick={() => dispatch(selectSection(section.id))}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${
                      selectedSectionId === section.id
                        ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-950 dark:border-indigo-800"
                        : "bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800"
                    }`}>
                    <GripVertical size={16} className="text-slate-400" />
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-sm truncate">
                        {section.type}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {section.id}
                      </p>
                    </div>
                  </button>

                  {/* Floating Controls for Reordering/Deletion */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      disabled={index === 0}
                      aria-label="Move section up"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSections = [...page.sections];
                        [newSections[index], newSections[index - 1]] = [
                          newSections[index - 1],
                          newSections[index],
                        ];
                        dispatch(reorderSections(newSections));
                      }}>
                      <ArrowUp size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      disabled={index === page.sections.length - 1}
                      aria-label="Move section down"
                      onClick={(e) => {
                        e.stopPropagation();
                        const newSections = [...page.sections];
                        [newSections[index], newSections[index + 1]] = [
                          newSections[index + 1],
                          newSections[index],
                        ];
                        dispatch(reorderSections(newSections));
                      }}>
                      <ArrowDown size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                      aria-label="Delete section"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeSection(section.id));
                      }}>
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 dark:border-slate-800 h-12 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-label="Add new section to page">
                  <Plus size={16} />
                  Add Section
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() =>
                      dispatch(
                        addSection({
                          id: `sec-${Math.random().toString(36).substr(2, 9)}`,
                          type: "hero",
                          props: {
                            title: "New Hero Section",
                            ctaLabel: "Click Me",
                            ctaUrl: "#",
                          },
                        }),
                      )
                    }>
                    Hero Section
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      dispatch(
                        addSection({
                          id: `sec-${Math.random().toString(36).substr(2, 9)}`,
                          type: "featureGrid",
                          props: {
                            title: "Features",
                            features: [
                              {
                                title: "Feature 1",
                                description: "Description",
                              },
                            ],
                          },
                        }),
                      )
                    }>
                    Feature Grid
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      dispatch(
                        addSection({
                          id: `sec-${Math.random().toString(36).substr(2, 9)}`,
                          type: "cta",
                          props: {
                            title: "Call to Action",
                            buttonLabel: "Join Now",
                            buttonUrl: "#",
                          },
                        }),
                      )
                    }>
                    CTA Banner
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </section>

          {selectedSection && (
            <>
              <Separator />
              <section>
                <h3 className="text-xs font-bold uppercase text-slate-500 mb-3">
                  Properties: {selectedSection.type}
                </h3>
                <div className="space-y-4">
                  {Object.entries(selectedSection.props).map(([key, value]) => (
                    <div key={key} className="space-y-1.5">
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </Label>
                      {key.toLowerCase().includes("color") ? (
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            id={key}
                            value={(value as string) || "#000000"}
                            className="w-12 h-10 p-1 rounded border cursor-pointer bg-white"
                            onChange={(e) =>
                              dispatch(
                                updateSectionProps({
                                  sectionId: selectedSection.id,
                                  props: { [key]: e.target.value },
                                }),
                              )
                            }
                          />
                          <Input
                            value={(value as string) || ""}
                            className="flex-1 font-mono text-xs"
                            onChange={(e) =>
                              dispatch(
                                updateSectionProps({
                                  sectionId: selectedSection.id,
                                  props: { [key]: e.target.value },
                                }),
                              )
                            }
                          />
                        </div>
                      ) : typeof value === "string" ? (
                        <Input
                          id={key}
                          value={value as string}
                          onChange={(e) =>
                            dispatch(
                              updateSectionProps({
                                sectionId: selectedSection.id,
                                props: { [key]: e.target.value },
                              }),
                            )
                          }
                        />
                      ) : (
                        <div className="text-xs text-slate-400 p-2 bg-slate-100 rounded">
                          Complex property ({typeof value})
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </TabsContent>

        <TabsContent
          value="history"
          className="flex-1 overflow-y-auto p-4 space-y-4">
          <h3 className="text-xs font-bold uppercase text-slate-500">
            Publish History
          </h3>
          {history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-400">
                No versions published yet.
              </p>
            </div>
          ) : (
            history.map((release, idx) => (
              <button
                key={release.version}
                type="button"
                onClick={() => {
                  dispatch(setPage(release.snapshot));
                  toast.success(`Viewing version ${release.version}`);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all group ${
                  idx === 0
                    ? "bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-50"
                    : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm"
                }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-indigo-600">
                      v{release.version}
                    </span>
                    {idx === 0 && (
                      <span className="text-[9px] bg-indigo-600 text-white px-1 rounded uppercase font-bold">
                        Latest
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-500 transition-colors">
                    {idx === 0 ? "Current" : "Restore ↩"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic truncate">
                  {release.changelog}
                </p>
                <div className="mt-2 text-[9px] text-slate-400 flex justify-between items-center">
                  <span>
                    {new Date(release.timestamp).toLocaleDateString()}
                  </span>
                  <span>
                    {new Date(release.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </button>
            ))
          )}
        </TabsContent>
      </Tabs>
    </aside>
  );
};
