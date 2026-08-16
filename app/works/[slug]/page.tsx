import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  GitFork,
  type LucideIcon,
} from "lucide-react";

import { PageTransition } from "@/components/motion/page-transition";
import { WorkBody } from "@/components/works/work-body";
import { WorkGallery } from "@/components/works/work-gallery";
import { getWorkBySlug } from "@/lib/content";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectLink = {
  href: string;
  icon: LucideIcon;
  label: string;
};

function hasProjectIntro(summary: string) {
  const normalized = summary.trim();
  return normalized !== "" && normalized !== "待补充";
}

function getProcessImageDimensions(slug: string) {
  if (
    slug === "trigear" ||
    slug === "roofsense" ||
    slug === "airoma" ||
    slug === "shellter"
  ) {
    return { width: 4096, height: 1447 };
  }

  return { width: 3840, height: 2160 };
}

export async function generateMetadata({
  params,
}: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work || work.status !== "published") {
    return { title: "Work not found" };
  }

  return {
    title: work.title,
    description: hasProjectIntro(work.summary)
      ? work.summary
      : (work.subtitle ?? `${work.title} 项目详情`),
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work || work.status !== "published") notFound();

  const projectLinks: ProjectLink[] = [
    work.externalUrl
      ? {
          href: work.externalUrl,
          icon: ExternalLink,
          label: work.externalLabel ?? "在线体验",
        }
      : null,
    work.githubUrl
      ? { href: work.githubUrl, icon: GitFork, label: work.githubLabel ?? "GitHub" }
      : null,
  ].filter((link): link is ProjectLink => link !== null);

  const details = [
    { label: "项目", value: work.title },
    { label: "周期", value: work.timeline ?? work.duration },
    { label: "日期", value: work.year },
    { label: "角色", value: work.role },
  ].filter((detail) => detail.value);
  const galleryImages = work.gallery?.length ? work.gallery : [work.cover];
  const displayTitle = work.slug === "meetpoint" ? "碰碰头" : work.title;
  const processImages = work.processImages ?? [];
  const showProjectIntro = hasProjectIntro(work.summary);
  const isTrigear = work.slug === "trigear";
  const isAiroma = work.slug === "airoma";
  const isWideProcessProject =
    isTrigear ||
    work.slug === "roofsense" ||
    isAiroma ||
    work.slug === "shellter";
  const processSectionBackground = isTrigear
    ? "#D0D0D0"
    : isAiroma
      ? "#F2EEEB"
      : "#FFFFFF";
  const processImageDimensions = getProcessImageDimensions(work.slug);
  const hasFinalProcessSection = processImages.length > 0 && !work.videoUrl;
  const mainBottomPadding = hasFinalProcessSection ? "pb-0" : "pb-20 md:pb-28";
  const processImageSpacing =
    isWideProcessProject
      ? "space-y-28 md:space-y-40 lg:space-y-48"
      : "space-y-12 md:space-y-16";
  const processSectionPadding = isWideProcessProject
    ? "px-0"
    : "px-5 sm:px-8 lg:px-11";
  const processImageContainerClass = isWideProcessProject
    ? "w-full max-w-none"
    : "mx-auto w-full max-w-[1120px]";
  const processImageSizes = isWideProcessProject
    ? "100vw"
    : "(max-width: 1023px) calc(100vw - 2.5rem), 1120px";

  return (
    <PageTransition>
      <main
        className={`min-h-[100dvh] bg-[#0F0F0F] px-5 pt-[5.5rem] text-[#f4f5f2] sm:px-8 md:pt-[6.5rem] lg:px-11 ${mainBottomPadding}`}
      >
        <div className="mx-auto w-full max-w-[1280px]">
          <section>
            <div className="mx-auto mb-5 w-full max-w-[920px]">
              <h1 className="inline-flex rounded-[7px] border border-[#cfffc4] px-4 py-1.5 text-[clamp(1.05rem,1.6vw,1.45rem)] font-normal leading-none tracking-[-0.015em] text-[#cfffc4]">
                ../{displayTitle}
              </h1>
            </div>

            <WorkGallery
              alt={work.coverAlt}
              captions={work.galleryCaptions}
              images={galleryImages}
              title={work.title}
            />
          </section>

          <section className="mx-auto mt-8 grid max-w-[920px] gap-8 border-t border-white/10 pt-6 md:mt-9 md:grid-cols-[minmax(11rem,0.34fr)_minmax(0,0.66fr)] md:gap-12 md:pt-7">
            <aside>
              {details.length ? (
                <dl className="grid grid-cols-2 gap-x-7 gap-y-4 md:grid-cols-1 md:gap-y-4">
                  {details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-[13px] font-normal leading-5 text-[#cfffc4]">
                        {detail.label}
                      </dt>
                      <dd className="mt-1 whitespace-pre-line text-[15px] font-normal leading-6 text-[#f4f5f2]">
                        {detail.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </aside>

            <div>
              <h2 className="text-[13px] font-normal leading-5 text-[#cfffc4]">
                项目介绍
              </h2>
              {showProjectIntro ? (
                <p className="mt-1 max-w-[68ch] text-[15px] font-normal leading-6 text-[#f4f5f2] text-pretty">
                  {work.summary}
                </p>
              ) : null}
              {work.videoUrl ? <WorkBody source={work.body} variant="compact" /> : null}

              {projectLinks.length ? (
                <div className="mt-6">
                  <p className="text-[13px] font-normal leading-5 text-[#cfffc4]">
                    链接
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {projectLinks.map(({ href, icon: Icon, label }) => (
                      <Link
                        className="inline-flex items-center gap-1.5 text-[15px] font-normal leading-6 text-[#f4f5f2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#cfffc4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cfffc4]"
                        href={href}
                        key={label}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {label}
                        <Icon
                          aria-hidden="true"
                          className="size-3.5"
                          strokeWidth={1.75}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {processImages.length ? (
            <section
              className={`relative left-1/2 mt-28 w-screen -translate-x-1/2 py-20 md:mt-40 md:py-28 lg:py-32 ${processSectionPadding}`}
              style={{ backgroundColor: processSectionBackground }}
            >
              <div className={`${processImageContainerClass} ${processImageSpacing}`}>
                {processImages.map((image, index) => (
                  <figure
                    className="w-full"
                    key={image}
                    style={{ backgroundColor: processSectionBackground }}
                  >
                    <Image
                      alt={
                        work.processImageAlts?.[index] ??
                        `${work.title} 展示图 ${index + 1}`
                      }
                      className="h-auto w-full"
                      height={processImageDimensions.height}
                      sizes={processImageSizes}
                      src={image}
                      unoptimized
                      width={processImageDimensions.width}
                    />
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {work.videoUrl ? (
            <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[#0F0F0F] px-5 py-16 sm:px-8 md:py-24 lg:px-11">
              <div className="mx-auto w-full max-w-[920px]">
                <h2 className="inline-flex rounded-[7px] border border-[#cfffc4] px-4 py-1.5 text-[clamp(1.05rem,1.6vw,1.45rem)] font-normal leading-none tracking-[-0.015em] text-[#cfffc4]">
                  视频演示
                </h2>
                <div
                  className="mt-5 flex aspect-video w-full items-center justify-center overflow-hidden rounded-[16px] bg-[#000000] p-4 md:p-5"
                  aria-label={`${work.title} 演示视频`}
                >
                  <video
                    className="h-full w-full rounded-[10px] object-contain"
                    controls
                    playsInline
                    preload="metadata"
                    src={work.videoUrl}
                  >
                    当前浏览器不支持视频播放。
                  </video>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </PageTransition>
  );
}
