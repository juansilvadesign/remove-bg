import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ImageCompareResultProps {
  originalImage: string;
  processedImage: string;
  fileName?: string;
  onReset: () => void;
}

export function ImageCompareResult({
  originalImage,
  processedImage,
  fileName,
  onReset,
}: ImageCompareResultProps) {
  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = `bg-removed-${fileName || "image"}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="rounded-xl border-2 border-gray-300 bg-white p-4 shadow-md">
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={originalImage}
              alt="处理前图片"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f5",
              }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={processedImage}
              alt="处理后图片"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f5",
              }}
            />
          }
          className="rounded-lg"
          style={{
            height: "100%",
            width: "100%",
          }}
          position={50}
        />
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <Button onClick={onReset} className="px-8">
          选择其他图片
        </Button>
        <Button
          onClick={handleDownload}
          className="bg-green-500 px-8 hover:bg-green-600"
        >
          <Download className="mr-2 h-4 w-4" />
          下载结果
        </Button>
      </div>
    </div>
  );
}
