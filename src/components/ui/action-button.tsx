"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

export default function ActionButton({
  children,
  className,
  ...rest
}: ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return (
    <span className="relative">
      <Button
        className={`${className} ${pending ? "*:invisible" : ""}`}
        disabled={pending}
        {...rest}
      >
        {children}
      </Button>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white">
        <Spinner loading={pending} className="size-4" />
      </div>
    </span>
  );
}
