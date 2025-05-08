"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import HomepageImage1 from "@/components/images/homepage-image-1";
import HomepageImage2 from "@/components/images/homepage-image-2";
import { ImageUploader } from "@/components/ImageUploader";
import { ProcessingLoader } from "@/components/ProcessingLoader";
import { ImageCompareResult } from "@/components/ImageCompareResult";
import { ProcessingError } from "@/components/ProcessingError";
import { fileToDataUrl, processImageBackground } from "@/lib/backgroundRemoval";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [originalImageDataUrl, setOriginalImageDataUrl] = useState<
    string | null
  >(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 清理URL对象，防止内存泄漏
  useEffect(() => {
    return () => {
      if (processedImage && processedImage.startsWith("blob:")) {
        URL.revokeObjectURL(processedImage);
      }
    };
  }, [processedImage]);

  const handleFileChange = async (file: File | null) => {
    try {
      // 清理之前的状态
      setIsLoading(false);
      if (processedImage && processedImage.startsWith("blob:")) {
        URL.revokeObjectURL(processedImage);
        setProcessedImage(null);
      }
      setOriginalImageDataUrl(null);

      if (!file) {
        setSelectedImage(null);
        return;
      }

      // 将文件转换为 Data URL (不会过期)
      const dataUrl = await fileToDataUrl(file);
      setSelectedImage(file);
      setOriginalImageDataUrl(dataUrl);
      setIsLoading(true);

      try {
        // 处理图片
        const processedUrl = await processImageBackground(
          file,
        );
        setProcessedImage(processedUrl);
      } catch (e) {
        console.error("背景移除失败:", e);
        toast.error("背景移除失败，请检查图片或稍后再试。");
      } finally {
        setIsLoading(false);
      }
    } catch (err) {
      console.error("处理图片时出错:", err);
      toast.error("处理图片时出错，请重试。");
      setIsLoading(false);
    }
  };

  const resetSelection = () => {
    handleFileChange(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mx-auto mt-6 max-w-lg md:mt-10">
        <h1 className="text-center font-dingtalk text-4xl font-bold md:text-5xl">
          智能移除图片背景
          <br /> 一键完成
        </h1>
        <p className="mx-auto mt-6 max-w-md text-balance text-center leading-snug md:text-lg md:leading-snug">
          上传一张<strong>图片</strong>，即可移除背景并下载。
        </p>

        <div className="relative mx-auto mt-20 max-w-md px-4 md:mt-16">
          <div className="pointer-events-none absolute left-[-40px] top-[-185px] flex w-[200px] items-center md:-left-[calc(min(30vw,350px))] md:-top-20 md:w-[390px]">
            <HomepageImage1 />
          </div>
          <div className="pointer-events-none absolute right-[20px] top-[-110px] flex w-[70px] justify-center md:-right-[calc(min(30vw,350px))] md:-top-5 md:w-[390px]">
            <HomepageImage2 />
          </div>

          {!originalImageDataUrl && !isLoading ? (
            <ImageUploader onImageSelected={handleFileChange} />
          ) : (
            <>
              {/* 加载中 */}
              {isLoading && <ProcessingLoader />}

              {/* 处理结果 */}
              {!isLoading && processedImage && originalImageDataUrl && (
                <ImageCompareResult
                  originalImage={originalImageDataUrl}
                  processedImage={processedImage}
                  fileName={selectedImage?.name}
                  onReset={resetSelection}
                />
              )}

              {/* 处理失败 */}
              {!isLoading && !processedImage && originalImageDataUrl && (
                <ProcessingError
                  imageUrl={originalImageDataUrl}
                  onReset={resetSelection}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
