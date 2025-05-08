import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onImageSelected: (file: File | null) => void;
}

export function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        onImageSelected(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex aspect-video flex-col items-center justify-center rounded-xl border-2 border-dashed ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      } bg-white p-6 shadow-md transition-colors md:p-8`}
    >
      <input {...getInputProps()} />
      <Button
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        className="mb-4 h-12 px-8 text-base"
      >
        <SparklesIcon className="mr-2 h-5 w-5" />
        选择图片
      </Button>
      <p className="text-gray-500">或拖放图片至此处</p>
    </div>
  );
}
