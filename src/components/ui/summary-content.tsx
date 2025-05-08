"use client";

import Image from "next/image";

interface SummaryContentProps {
  title?: string;
  summary?: string;
  imageUrl?: string;
}

export default function SummaryContent({
  title,
  summary,
  imageUrl,
}: SummaryContentProps) {
  return (
    <div>
      {imageUrl && (
        <>
          <Image
            className="rounded-md"
            src={imageUrl}
            width={1280}
            height={720}
            alt=""
          />
          <hr className="-mx-5 my-8" />
        </>
      )}
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div
        className="prose mt-4 text-sm"
        dangerouslySetInnerHTML={{
          __html: summary || "",
        }}
      />
    </div>
  );
}
