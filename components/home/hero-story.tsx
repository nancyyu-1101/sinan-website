"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

import {
  HERO_FRAME_HEIGHT,
  HERO_FRAME_WIDTH,
  heroLayerTracks,
  type HeroLayerTrack,
  type HeroStage,
} from "@/components/home/hero-layer-data";

const stageBreakpoints = [0.18, 0.42, 0.67, 0.84] as const;
const stageTransition = {
  duration: 1.15,
  ease: [0.16, 1, 0.3, 1] as const,
};


function getStage(progress: number): HeroStage {
  if (progress < stageBreakpoints[0]) return 1;
  if (progress < stageBreakpoints[1]) return 2;
  if (progress < stageBreakpoints[2]) return 3;
  if (progress < stageBreakpoints[3]) return 4;
  return 5;
}

function percent(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function getLayerZIndex(layer: HeroLayerTrack, stage: HeroStage) {
  if (stage >= 4 && layer.key === "mouth") return 20;
  if (stage < 3) return layer.zIndex;

  const stageThreeOrder: Record<string, number> = {
    "hair-back": 2,
    "hat-base": 3,
    "hat-ribs": 4,
    "hat-fold": 5,
    face: 6,
    mouth: 7,
    glasses: 8,
    eyes: 9,
  };

  return stageThreeOrder[layer.key] ?? layer.zIndex;
}

function HeroLayer({ layer, stage }: { layer: HeroLayerTrack; stage: HeroStage }) {

  const current = layer.stage[stage];
  const sources = useMemo(
    () => [...new Set(Object.values(layer.stage).map((item) => item.src))],
    [layer],
  );
  const movementTransition =
    layer.key === "mouth" && stage >= 4
      ? { ...stageTransition, duration: 1.3 }
      : stageTransition;
  const opacityTransition =
    layer.key === "hair-front" && stage === 2
      ? { duration: 0.55, ease: "linear" as const }
      : { duration: 0 };


  return (
    <motion.div
      animate={{
        height: percent(current.bounds.height, HERO_FRAME_HEIGHT),
        left: percent(current.bounds.x, HERO_FRAME_WIDTH),
        opacity: current.opacity,
        top: percent(current.bounds.y, HERO_FRAME_HEIGHT),
        width: percent(current.bounds.width, HERO_FRAME_WIDTH),
      }}
      aria-hidden="true"
      className="absolute will-change-[left,top,width,height,opacity]"
      initial={false}
      style={{
        ...(layer.key === "hair-front"
          ? {
              visibility: stage >= 3 ? "hidden" : "visible",
            }
          : {}),
        zIndex: getLayerZIndex(layer, stage),
      }}

      transition={{
        height: movementTransition,
        left: movementTransition,
        opacity: opacityTransition,
        top: movementTransition,
        width: movementTransition,
      }}
    >
      {sources.map((src) => (
        <div
          className="absolute inset-0"
          key={src}
          style={{ opacity: current.src === src ? 1 : 0 }}
        >
          <Image
            alt=""
            className="object-fill"
            fill
            priority={src.includes("/frame-1/")}
            sizes="100vw"
            src={src}
            unoptimized
          />
        </div>
      ))}
    </motion.div>
  );
}

export function HeroStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<HeroStage>(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });


  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setStage(getStage(scrollYProgress.get()));
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStage = getStage(latest);
    setStage((current) => (current === nextStage ? current : nextStage));
  });

  if (reduceMotion) {
    return (
      <section
        aria-label="郁思南个人介绍"
        className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black"
        data-home-hero
      >
        <Introduction />
      </section>
    );
  }

  const showCornerNames = stage < 4;
  const showIntroduction = stage >= 4;
  const isFinalStage = stage === 5;

  return (
    <section
      aria-label="郁思南个人介绍"
      className="relative h-[360dvh] bg-ip-yellow md:h-[440dvh]"
      data-home-hero
      ref={sectionRef}
    >
      <div className="sticky top-0 min-h-[100dvh] overflow-hidden bg-ip-yellow">
        <motion.div
          animate={{ opacity: showCornerNames ? 1 : 0 }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 hidden md:block"
          initial={false}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="absolute left-[2.2%] top-[6.8%] font-nb-international text-[clamp(2rem,calc(4.65vw_-_8px),6.9rem)] font-normal leading-none tracking-[0.02em] text-white">
            Sinan Yu™
          </p>
          <p className="absolute bottom-[6.7%] right-[3.7%] font-source-han text-[clamp(2rem,calc(4.65vw_-_8px),6.9rem)] font-medium leading-none tracking-[0.18em] text-white">
            郁思南
          </p>
        </motion.div>

        <div
          aria-label="郁思南戴针织帽和墨镜的个人 IP 形象"
          className="hero-artboard absolute left-1/2 top-1/2 aspect-[2536/1398] -translate-x-1/2 -translate-y-1/2"
          role="img"
        >
          {heroLayerTracks.map((layer) => (
            <HeroLayer key={layer.key} layer={layer} stage={stage} />

          ))}
        </div>

        <motion.div
          animate={{ opacity: isFinalStage ? 1 : 0 }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 bg-black"
          initial={false}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          animate={{
            opacity: showIntroduction ? 1 : 0,
            scale: isFinalStage ? 1 : 0.88,
            y: showIntroduction ? 0 : 16,
          }}
          className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
          initial={false}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Introduction />
        </motion.div>
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <div className="w-full max-w-[75rem] -translate-y-[4dvh] px-5 text-center text-white md:px-10">
      <h1 className="text-[24px] font-normal leading-tight tracking-[0.04em]">
        <span className="font-futura">hi, </span>
        <span className="font-cn">我是</span>
        <span className="font-cn text-white">郁思南</span>
      </h1>
      <div className="mt-3 font-cn text-[24px] font-normal leading-[1.45] tracking-[0.04em] md:mt-4">
        <p>2002年生于中国上海，目前长居上海</p>
        <p>2025年前往法国巴黎交换，2026年本科毕业于同济大学工业设计方向</p>
      </div>
      <p className="mx-auto mt-7 max-w-[62rem] font-cn text-[24px] font-normal leading-[1.5] tracking-[0.04em] text-ip-yellow md:mt-10">
        产品设计师 / 工业设计师 / 重度影迷 / 滑板混子
      </p>
      <p className="mt-7 font-cn text-[24px] font-normal leading-relaxed tracking-[0.04em] md:mt-10">
        我爱我所创造的一切
      </p>
    </div>
  );
}