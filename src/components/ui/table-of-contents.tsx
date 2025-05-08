"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Chunk } from "@/lib/summarize";

interface TableOfContentsProps {
  activeChunkIndex: number | "quick-summary" | null;
  setActiveChunkIndex: (index: number | "quick-summary" | null) => void;
  quickSummary: { title: string; summary: string } | undefined;
  chunks: Chunk[];
}

export default function TableOfContents({
  activeChunkIndex,
  setActiveChunkIndex,
  quickSummary,
  chunks,
}: TableOfContentsProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <Button
        variant="outline"
        className={`${activeChunkIndex === "quick-summary" ? "bg-white hover:bg-white" : "hover:bg-gray-200"} inline-flex w-full justify-between border-gray-250 px-4 py-6 text-base font-semibold shadow-sm`}
        onClick={() => setActiveChunkIndex("quick-summary")}
        disabled={!quickSummary}
      >
        Quick summary
        <Spinner loading={!quickSummary} />
      </Button>
      <hr />
      <div className="flex flex-col gap-2">
        {chunks.map((chunk, i) => (
          <Button
            key={i}
            variant="outline"
            className={`${activeChunkIndex === i ? "bg-white hover:bg-white" : "hover:bg-gray-200"} inline-flex h-auto w-full justify-between border-gray-250 px-4 py-3 text-base shadow-sm transition disabled:cursor-not-allowed`}
            disabled={!chunk.summary}
            onClick={() => setActiveChunkIndex(i)}
          >
            <span className="flex h-full min-w-0 flex-col justify-start text-left">
              <span className="text-xs font-medium uppercase text-gray-500">
                Section {i + 1}
              </span>
              <span className="truncate text-sm">
                {chunk.title ?? <>&hellip;</>}
              </span>
            </span>
            <Spinner loading={!chunk.summary} />
          </Button>
        ))}
      </div>
    </div>
  );
}
