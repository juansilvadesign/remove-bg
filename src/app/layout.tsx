import GithubIcon from "@/components/icons/github";
import XIcon from "@/components/icons/x";
import Logo from "@/components/ui/logo";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { Toaster } from "sonner";
import Link from "next/link";

import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dingTalkFont = localFont({
  src: "../fonts/DingTalk_JinBuTi.ttf",
  variable: "--font-dingtalk",
});

export const metadata: Metadata = {
  title: "智能抠图 | 一键移除图片背景",
  description: "上传图片，立即获得背景移除效果，免费高效的AI抠图工具！",
  openGraph: {
    images: "https://rmbg.hellokaton.me/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="zh">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          dingTalkFont.variable,
          `flex min-h-screen flex-col bg-gray-100 text-gray-900 antialiased`,
        )}
      >
        <header className="py-6 text-center">
          <Link href="/" className="inline-flex justify-center">
            <Logo />
          </Link>
        </header>

        <main className="grow overflow-hidden">{children}</main>
        <RadixToaster />
        <Toaster position="top-center" richColors />
        <footer className="mx-auto mt-14 flex w-full max-w-7xl items-center justify-between px-4 py-6 md:mt-0">
          <p className="text-xs text-gray-300 md:text-sm">
            背景移除由{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 underline transition hover:text-gray-900"
              href="https://github.com/imgly/background-removal-js"
            >
              @imgly/background-removal
            </a>{" "}
            提供
          </p>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-250 bg-white px-2 py-1.5 text-xs text-gray-300 shadow transition hover:bg-white/75 md:rounded-xl md:px-4 md:text-sm"
              href="https://github.com/hellokaton/remove-bg"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            <a
              href="https://x.com/hellokaton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-gray-250 bg-white px-2 py-1.5 text-xs text-gray-300 shadow transition hover:bg-white/75 md:rounded-xl md:px-4 md:text-sm"
            >
              <XIcon className="size-3" />
              Twitter
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
