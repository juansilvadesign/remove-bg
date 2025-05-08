"use client";

import { useState, useEffect, useRef } from "react";

interface ImageCompareProps {
  originalSrc: string;
  processedSrc: string;
}

const ImageCompare = ({ originalSrc, processedSrc }: ImageCompareProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(newPosition);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-white p-5 shadow-lg">
      <h3 className="mb-3 text-center font-semibold text-gray-700">
        拖动滑块查看对比效果
      </h3>
      <div
        ref={containerRef}
        className="relative h-[400px] w-full select-none overflow-hidden rounded-md shadow-sm"
      >
        {/* 背景移除后图片 */}
        <div className="absolute h-full w-full bg-[#f0f0f0]">
          <img
            src={processedSrc}
            alt="背景移除后"
            className="h-full w-full object-contain"
          />
        </div>

        {/* 原图 */}
        <div
          className="absolute h-full overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={originalSrc}
            alt="原图"
            className="h-full w-full object-contain"
            style={{ width: `${100 / (position / 100)}%` }}
          />
        </div>

        {/* 滑块 */}
        <div
          className="absolute top-0 z-10 h-full w-1 cursor-ew-resize bg-blue-500"
          style={{ left: `${position}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
            ⇄
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompare;
