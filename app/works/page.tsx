import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";
import { WorkListItem } from "@/components/works/work-list-item";
import { getAllWorks, type WorkDocument } from "@/lib/content";

export const metadata: Metadata = {
  title: "Works",
  description:
    "郁思南的工业设计、UI 设计与 Vibecoding 项目，展示从产品判断到视觉与原型落地的实践。",
};

const SECTION_SLOT_COUNT = 4;

type WorkListCard = {
  cover: string;
  coverAlt: string;
  href?: string;
  id: string;
  meta?: string;
  title: string;
};

const meetpointWorkSlugs = ["meetpoint"];
const yigeCoCreationWorkSlugs = ["yige-co-creation"];
const formocracyWorkSlugs = ["formocracy"];
const futureTodoWorkSlugs = ["future-todo-assistant"];

const industrialDesignWorks: WorkListCard[] = [
  {
    id: "trigear",
    title: "Trigear",
    meta: "团队骑行 / 共享能源 / 户外",
    cover: "/works/industrial-design/trigear-cover.webp",
    coverAlt: "Trigear 工业设计项目主图，户外地面上展示圆形设备与手持模块。",
    href: "/works/trigear",
  },
  {
    id: "roofsense",
    title: "Roofsense 屋感",
    meta: "可持续能源 / 光伏维护 / 服务设计",
    cover: "/works/industrial-design/roofsense-cover-v2.webp",
    coverAlt: "Roofsense 工业设计项目主图，手机展示屋顶设备信息界面。",
    href: "/works/roofsense",
  },
  {
    id: "airoma",
    title: "Airoma",
    meta: "航空体验 / 机上餐饮 / 感官设计",
    cover: "/works/industrial-design/airoma-cover.webp",
    href: "/works/airoma",
    coverAlt: "Airoma 工业设计项目主图，飞机座椅场景中展示设备结构。",
  },
  {
    id: "shellter",
    title: "Shellter",
    meta: "自然灾害 / 女性健康 / 情绪支持 / 公共服务设计",
    cover: "/works/industrial-design/shellter-cover.webp",
    href: "/works/shellter",
    coverAlt: "Shellter 工业设计项目主图，黑色织物原型上有针线结构。",
  },
];

type WorkSectionProps = {
  title: string;
  works: WorkListCard[];
};

function getPublishedWorksBySlug(works: WorkDocument[], slugs: string[]) {
  return slugs
    .map((slug) =>
      works.find((work) => work.slug === slug && work.status === "published"),
    )
    .filter((work): work is WorkDocument => work !== undefined);
}

function WorkSection({ title, works }: WorkSectionProps) {
  const emptySlots = Math.max(0, SECTION_SLOT_COUNT - works.length);

  return (
    <section aria-labelledby={`${title}-heading`}>
      <h2
        className="inline-flex rounded-[6px] border border-[#cfffc4] px-5 py-2 text-[20px] font-normal leading-none tracking-[0] text-[#cfffc4]"
        id={`${title}-heading`}
      >
        {title}
      </h2>

      <div className="mt-10 grid gap-x-12 gap-y-14 md:grid-cols-2 md:gap-y-20">
        {works.map((work) => (
          <WorkListItem key={work.id} work={work} />
        ))}

        {Array.from({ length: emptySlots }, (_, index) => (
          <WorkReservedSlot
            index={works.length + index + 1}
            key={`${title}-slot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

function WorkReservedSlot({ index }: { index: number }) {
  return (
    <article aria-label={`预留项目 ${index}`}>
      <div className="aspect-[16/9] rounded-[8px] border border-dashed border-[#cfffc4]/35 bg-[#cfffc4]/[0.035]" />
      <div className="mt-5 text-center">
        <p className="text-[20px] font-normal leading-tight tracking-[0] text-[#f4f5f2]/40">
          项目 {String(index).padStart(2, "0")}
        </p>
        <p className="mt-2 text-[15px] font-light leading-6 tracking-[0.02em] text-[#f4f5f2]/45 sm:text-[16px]">
          预留位置
        </p>
      </div>
    </article>
  );
}

export default async function WorksPage() {
  const works = await getAllWorks();
  const vibecodingWorks = [
    ...getPublishedWorksBySlug(works, formocracyWorkSlugs).map(toWorkListCard),
    ...getPublishedWorksBySlug(works, meetpointWorkSlugs).map(toWorkListCard),
    ...getPublishedWorksBySlug(works, yigeCoCreationWorkSlugs).map(
      toWorkListCard,
    ),
    ...getPublishedWorksBySlug(works, futureTodoWorkSlugs).map(toWorkListCard),
  ];

  return (
    <PageTransition>
      <main className="min-h-[100dvh] bg-black pb-24 pt-32 text-[#f4f5f2] md:pb-36 md:pt-40">
        <div className="mx-auto w-full max-w-[1450px] px-5 sm:px-8 lg:px-11">
          <header>
            <h1 className="whitespace-nowrap text-[clamp(24px,6.8vw,44px)] font-bold leading-[1.35] tracking-[0]">
              从好奇心生长出来的项目
            </h1>
            <p className="mt-5 text-base font-normal leading-7 text-[#cfffc4] sm:text-lg md:text-xl">
              工业设计 | 交互设计 | Vibecoding
            </p>
          </header>

          <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
            <WorkSection title="Vibecoding" works={vibecodingWorks} />
            <WorkSection title="工业设计" works={industrialDesignWorks} />
          </div>
        </div>
      </main>
    </PageTransition>
  );
}

function toWorkListCard(work: WorkDocument): WorkListCard {
  return {
    id: work.slug,
    title: work.slug === "meetpoint" ? "Meetpoint 碰碰头" : work.title,
    meta:
      work.slug === "meetpoint"
        ? "社交 / 地图 / 移动端"
        : work.slug === "future-todo-assistant"
          ? "申请规划 / 事项管理 / 小程序"
        : (work.displayType ?? "Vibecoding"),
    cover: work.cover,
    coverAlt: work.coverAlt,
    href: `/works/${work.slug}`,
  };
}
