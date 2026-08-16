import Link from "next/link";
import { PersonalIP } from "@/components/brand/personal-ip";
import { PageTransition } from "@/components/motion/page-transition";

export default function NotFound() {
  return (
    <PageTransition>
      <main className="page-shell flex min-h-[100dvh] items-center pb-32 pt-32 md:pb-20">
        <section className="content-grid grid gap-10 md:grid-cols-[1fr_16rem] md:items-center">
          <div>
            <p className="section-kicker">404</p>
            <h1 className="page-title max-w-3xl">This page wandered off.</h1>
            <Link
              className="mt-10 inline-flex w-fit items-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href="/"
            >
              Return Home
            </Link>
          </div>
          <PersonalIP
            className="size-full max-w-64 rounded-full"
            sizes="(min-width: 768px) 256px, 50vw"
            variant="notFound"
          />
        </section>
      </main>
    </PageTransition>
  );
}
