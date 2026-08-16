import Link from "next/link";
import { PersonalIP } from "@/components/brand/personal-ip";
import { contact } from "@/data/contact";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="page-shell pb-12 pt-16 md:pb-10">
      <div className="content-grid flex flex-col gap-8 border-t border-line pt-8 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <PersonalIP
            className="size-12 rounded-full"
            sizes="48px"
            variant="footer"
          />
          <div>
            <p className="font-medium text-ink">{profile.name.en}</p>
            <p className="mt-1 text-sm text-ink-muted">{profile.role}</p>
          </div>
        </div>
        <Link
          className="w-fit text-sm text-ink-muted underline decoration-line underline-offset-4 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          href={contact.email.href}
        >
          {contact.email.value}
        </Link>
      </div>
    </footer>
  );
}
