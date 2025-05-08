import { Button } from "@/components/ui/button";

interface ProcessingErrorProps {
  imageUrl: string;
  onReset: () => void;
}

export function ProcessingError({ imageUrl, onReset }: ProcessingErrorProps) {
  return (
    <div className="rounded-xl border-2 border-red-300 bg-white p-4 shadow-md">
      <h3 className="mb-3 text-center font-semibold text-red-500">处理失败</h3>
      <div className="flex justify-center overflow-hidden rounded-lg bg-[#f0f0f0] p-2">
        <img
          src={imageUrl}
          alt="原始图片"
          className="max-h-[300px] object-contain"
        />
      </div>
      <div className="mt-4 text-center">
        <Button onClick={onReset} className="px-8">
          选择其他图片
        </Button>
      </div>
    </div>
  );
}
