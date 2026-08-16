import { PersonalIP } from "@/components/brand/personal-ip";

export default function Loading() {
  return (
    <main
      aria-live="polite"
      className="page-shell flex min-h-[100dvh] items-center justify-center"
      role="status"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <PersonalIP
          className="size-16 rounded-full"
          priority
          sizes="64px"
          variant="loading"
        />
        <span className="text-sm text-ink-muted">Loading</span>
      </div>
    </main>
  );
}
