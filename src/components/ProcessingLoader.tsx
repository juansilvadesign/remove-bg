
export function ProcessingLoader() {
  return (
    <div className="flex aspect-video flex-col items-center justify-center rounded-xl bg-white p-6 shadow-md">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
      <p className="mt-4 text-lg font-medium text-gray-700">
        移除背景中...
      </p>
    </div>
  );
}
