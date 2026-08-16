import { PhotographyGallery } from "@/components/photography/photography-gallery";
import { PageTransition } from "@/components/motion/page-transition";
import { photographyGallery, photographyGroups } from "@/data/photography";

export default function PhotographyPage() {
  return (
    <PageTransition>
      <main className="min-h-[100dvh] overflow-x-clip bg-[#000000] pb-16 pt-[4.5rem] md:pb-28">
        <PhotographyGallery groups={photographyGroups} items={photographyGallery} />
        <p className="mt-[clamp(10rem,14vw,18rem)] text-center text-[20px] font-normal tracking-[0.04em] text-[#ffffff]">
          ©2026 Sinan Yu
        </p>
      </main>
    </PageTransition>
  );
}

