import Image from "next/image";
import type { ReactNode } from "react";
import { Star } from "lucide-react";

import { HeroStory } from "@/components/home/hero-story";
import { Reveal } from "@/components/home/reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { awards } from "@/data/awards";
import {
  educationExperience,
  workExperience,
  type Experience,
} from "@/data/experience";
import { skillGroups } from "@/data/skills";

type ResumeSectionProps = {
  children: ReactNode;
  className?: string;
  id: string;
  titleZh: string;
};

function ResumeSection({
  children,
  className = "py-16 lg:py-20",
  id,
  titleZh,
}: ResumeSectionProps) {
  return (
    <section aria-labelledby={id} className={className}>
      <Reveal>
        <div className="border-b border-white/35 pb-5">
          <h2
            className="flex items-center gap-3 text-[28px] font-bold leading-tight"
            id={id}
          >
            <Star
              aria-hidden="true"
              className="size-4 fill-current text-ip-yellow"
              strokeWidth={1.5}
            />
            {titleZh}
          </h2>
        </div>
      </Reveal>
      <div>{children}</div>
    </section>
  );
}

function formatPeriod(item: Experience) {
  return item.period.start + " - " + item.period.end;
}

function ExperienceEntry({
  index,
  item,
}: {
  index: number;
  item: Experience;
}) {
  const detailItems =
    item.details?.map((detail) => ({
      label: detail.label,
      value: detail.value,
    })) ??
    item.highlights.map((highlight) => ({
      label: "",
      value: highlight,
    }));

  return (
    <Reveal delay={index * 0.05}>
      <article className="py-12 lg:py-14">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.8fr)] lg:gap-12">
          <div className="text-[20px] leading-[1.55]">
            <h3 className="font-bold">{item.organization}</h3>
            <p className="mt-2 font-bold">{item.location ?? item.department}</p>
          </div>

          <div className="text-[20px] leading-[1.55] lg:text-right">
            <p className="font-bold">{item.role}</p>
            <p className="mt-2 font-normal italic">{formatPeriod(item)}</p>
          </div>
        </header>

        {detailItems.length > 0 ? (
          <div
            className={
              "mt-9 " +
              (item.image
                ? "grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(18rem,1.15fr)] md:items-start"
                : "")
            }
          >
            <ul className="list-disc space-y-3 pl-6 text-[20px] font-normal leading-[1.55] text-[#d5d9d4] marker:text-[#d5d9d4]">
              {detailItems.map((detail, detailIndex) => (
                <li key={detail.label + detailIndex}>
                  {detail.label ? (
                    <strong className="font-bold text-[#f4f5f2]">
                      {detail.label}：
                    </strong>
                  ) : null}
                  {detail.value}
                </li>
              ))}
            </ul>

            {item.image ? (
              <figure className="relative aspect-[16/10] min-h-0 overflow-hidden md:w-2/3 md:justify-self-end">
                <Image
                  alt={item.image.alt}
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 100vw"
                  src={item.image.src}
                />
              </figure>
            ) : null}
          </div>
        ) : null}
      </article>
    </Reveal>
  );
}

function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <ExperienceEntry index={index} item={item} key={item.id} />
      ))}
    </div>
  );
}

function Portrait() {
  return (
    <div className="relative h-full min-h-[30rem] overflow-hidden bg-[#d9dcd8]">
      <Image
        alt="郁思南在东京街头坐在护栏旁，佩戴黑框眼镜与相机"
        className="object-cover object-[55%_54%]"
        fill
        sizes="(min-width: 1024px) 32vw, 100vw"
        src="/brand/profile/sinan-tokyo.webp"
      />
    </div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <main>
        <HeroStory />

        <div className="bg-[#000000] text-[#f4f5f2]">
          <div className="relative mx-auto max-w-[1800px] lg:grid lg:grid-cols-[clamp(20rem,31vw,31rem)_minmax(0,1fr)]">
            <aside className="hidden px-[clamp(1.5rem,2.5vw,3rem)] py-8 lg:block">
              <div className="sticky top-[6.5rem] h-[calc(100dvh-8.5rem)] min-h-[30rem]">
                <Portrait />
              </div>
            </aside>

            <div className="lg:hidden">
              <div className="mx-5 pt-20 sm:mx-8">
                <div className="aspect-[4/5]">
                  <Portrait />
                </div>
              </div>
            </div>

            <div className="min-w-0 px-5 pb-20 pt-8 sm:px-8 lg:px-[clamp(3rem,5vw,6rem)] lg:pb-32 lg:pt-24">
              <ResumeSection id="education-heading" titleZh="教育经历">
                <ExperienceList items={educationExperience} />
              </ResumeSection>

              <ResumeSection id="experience-heading" titleZh="实习经历">
                <ExperienceList items={workExperience} />
              </ResumeSection>

              <ResumeSection
                className="pb-16 pt-8 lg:pb-20 lg:pt-10"
                id="awards-heading"
                titleZh="获奖经历"
              >
                <div className="space-y-7 pt-9 text-[20px] font-normal leading-[1.55]">
                  {awards.map((award, index) => (
                    <Reveal delay={index * 0.05} key={award.id}>
                      <article>
                        <p>{award.year}</p>
                        <p>获得 {award.nameZh}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection id="skills-heading" titleZh="技能与兴趣">
                <ul className="list-disc space-y-3 pt-9 pl-6 text-[20px] font-normal leading-[1.55] marker:text-[#d5d9d4]">
                  {skillGroups.map((group, index) => (
                    <li key={group.id}>
                      <Reveal delay={index * 0.04}>
                        <strong className="font-bold text-[#f4f5f2]">
                          {group.titleZh}：
                        </strong>
                        {group.summaryZh}
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </ResumeSection>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
