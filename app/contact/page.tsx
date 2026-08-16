import type { Metadata } from "next";
import Image from "next/image";

import { PageTransition } from "@/components/motion/page-transition";
import { contact, type ContactLink } from "@/data/contact";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "联系产品设计师与工业设计师郁思南，交流产品设计、AI 原型与 Vibecoding 合作。",
};

const socialLinks = [contact.github, contact.instagram];
const directLinks = [contact.email, contact.phone];

function SocialLink({ link }: { link: ContactLink }) {
  return (
    <a
      aria-label={`${link.label}，在新标签页打开`}
      className="group flex w-fit items-baseline gap-3 text-[28px] font-normal leading-[1.25] tracking-[-0.02em] text-[#151914] outline-none transition-opacity hover:opacity-55 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#151914]"
      href={link.href}
      rel="noreferrer"
      target="_blank"
    >
      <span>{link.label}</span>
      <span
        aria-hidden="true"
        className="text-[14px] font-normal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      >
        ↗
      </span>
    </a>
  );
}

function DirectContact({ link }: { link: ContactLink }) {
  return (
    <span className="w-fit break-all text-[20px] font-normal leading-[1.35] tracking-[-0.01em] text-[#151914]">
      {link.value}
    </span>
  );
}

function ContactPortrait() {
  const portrait = (sizes: string) => (
    <Image
      alt=""
      className="object-contain object-bottom"
      fill
      priority
      sizes={sizes}
      src="/brand/ip/contact/contact-portrait-page4.svg"
    />
  );

  return (
    <>
      <div
        aria-label={profile.assets.personalIpAlt}
        className="pointer-events-none absolute inset-0 hidden md:block"
        role="img"
      >
        {portrait("100vw")}
      </div>
      <div
        aria-label={profile.assets.personalIpAlt}
        className="pointer-events-none absolute bottom-0 left-1/2 aspect-[1280/450] w-[160vw] -translate-x-1/2 md:hidden"
        role="img"
      >
        {portrait("160vw")}
      </div>
    </>
  );
}

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="relative h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#cfffc4] text-[#151914]">
        <section aria-labelledby="contact-title" className="relative h-full">
          <h1 className="sr-only" id="contact-title">
            Contact
          </h1>

          <div className="absolute left-5 right-5 top-[6.5rem] z-20 grid gap-9 md:left-[7.89%] md:right-[4.77%] md:top-[8.4375rem] md:grid-cols-[1fr_17.4375rem] md:gap-20">
            <nav aria-label="Social links" className="flex flex-col gap-4">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} link={link} />
              ))}
            </nav>

            <div className="flex flex-col items-start">
              <h2 className="font-cn text-[28px] font-normal leading-[1.25] tracking-[-0.02em]">
                打个招呼！
              </h2>
              <div className="mt-5 flex flex-col gap-2">
                {directLinks.map((link) => (
                  <DirectContact key={link.label} link={link} />
                ))}
              </div>
            </div>
          </div>

          <ContactPortrait />
        </section>
      </main>
    </PageTransition>
  );
}









