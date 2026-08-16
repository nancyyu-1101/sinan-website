import Link from "next/link";

import { PersonalIP } from "@/components/brand/personal-ip";

type LogoProps = {
  tone?: "light" | "dark";
};

export function Logo({ tone = "light" }: LogoProps) {
  return (
    <Link
      aria-label="返回首页"
      className={
        "flex h-12 w-16 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 " +
        (tone === "dark"
          ? "focus-visible:outline-[#f4f5f2]"
          : "focus-visible:outline-ink")
      }
      href="/"
    >
      <PersonalIP
        className="size-full object-contain"
        priority
        sizes="64px"
        variant="logo"
      />
    </Link>
  );
}
