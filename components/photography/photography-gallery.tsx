"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type {
  PhotographyGalleryItem,
  PhotographyGroup,
} from "@/data/photography";

type PhotographyGalleryProps = {
  groups: PhotographyGroup[];
  items: PhotographyGalleryItem[];
};

export function PhotographyGallery({ groups, items }: PhotographyGalleryProps) {
  const reduceMotion = useReducedMotion();
  const orderedItems = useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items],
  );
  const orderedGroups = useMemo(
    () => [...groups].sort((a, b) => a.order - b.order),
    [groups],
  );
  const itemsById = useMemo(
    () => new Map(orderedItems.map((item) => [item.id, item])),
    [orderedItems],
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = orderedItems.findIndex((item) => item.id === activeId);
  const activeItem = activeIndex >= 0 ? orderedItems[activeIndex] : null;

  const close = useCallback(() => setActiveId(null), []);
  const move = useCallback(
    (direction: -1 | 1) => {
      if (activeIndex < 0 || orderedItems.length < 2) return;
      const nextIndex =
        (activeIndex + direction + orderedItems.length) % orderedItems.length;
      setActiveId(orderedItems[nextIndex].id);
    },
    [activeIndex, orderedItems],
  );

  useEffect(() => {
    if (!activeItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem, close, move]);

  const renderImage = (item: PhotographyGalleryItem, sizes: string) => (
    <button
      aria-label={`查看大图：${item.alt}`}
      className="group block w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4f5f2]"
      key={item.id}
      onClick={() => setActiveId(item.id)}
      type="button"
    >
      <Image
        alt={item.alt}
        className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.01]"
        decoding="async"
        height={item.height}
        priority={item.order === 1}
        sizes={sizes}
        src={item.src}
        width={item.width}
      />
    </button>
  );

  const caption = (group: PhotographyGroup) => (
    <p className="leading-[1.35] tracking-[0.04em] text-[#ffffff]">
      <span className="block text-[20px] font-normal">{group.location}</span>
      <span className="block text-[16px] font-light">{group.date}</span>
    </p>
  );

  return (
    <>
      <div className="mx-auto flex w-full max-w-none flex-col gap-[clamp(4rem,6vw,7rem)] px-[clamp(1rem,1.6vw,2rem)] pb-[clamp(3rem,7vw,7rem)] pt-[clamp(0.75rem,1.5vw,1.5rem)]">
        {orderedGroups.map((group) => {
          const groupItems = group.imageIds
            .map((id) => itemsById.get(id))
            .filter((item): item is PhotographyGalleryItem => Boolean(item));

          if (group.layout === "center-single") {
            return (
              <section
                className="mx-auto w-[94%] md:w-[calc(50%-clamp(0.375rem,0.5vw,0.625rem))]"
                key={group.id}
              >
                {groupItems[0]
                  ? renderImage(groupItems[0], "(max-width: 767px) 100vw, 50vw")
                  : null}
                <div className="mt-5 text-center">{caption(group)}</div>
              </section>
            );
          }

          const media = (
            <div
              className={
                groupItems.length > 1
                  ? "grid grid-cols-2 items-start gap-2.5 md:gap-3"
                  : undefined
              }
            >
              {groupItems.map((item) =>
                renderImage(
                  item,
                  groupItems.length > 1
                    ? "(max-width: 767px) 50vw, 23vw"
                    : "(max-width: 767px) 100vw, 46vw",
                ),
              )}
            </div>
          );

          if (group.layout.startsWith("left")) {
            return (
              <section
                className="grid w-full items-start gap-5 md:grid-cols-2 md:gap-x-[clamp(0.75rem,1vw,1.25rem)]"
                key={group.id}
              >
                {media}
                <div className="md:pt-4">{caption(group)}</div>
              </section>
            );
          }

          return (
            <section
              className="grid w-full gap-5 md:grid-cols-2 md:items-start md:gap-x-[clamp(0.75rem,1vw,1.25rem)]"
              key={group.id}
            >
              <div className="text-right md:pt-4">{caption(group)}</div>
              {media}
            </section>
          );
        })}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            animate={{ opacity: 1 }}
            aria-modal="true"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b0d0b]/95 p-4 md:p-8"
            exit={{ opacity: 0 }}
            initial={reduceMotion ? false : { opacity: 0 }}
            onClick={close}
            role="dialog"
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <button
              aria-label="关闭大图"
              className="absolute right-3 top-3 z-10 flex size-12 items-center justify-center text-[#f4f5f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f5f2] md:right-6 md:top-6"
              onClick={close}
              type="button"
            >
              <X aria-hidden="true" className="size-7" strokeWidth={1.5} />
            </button>

            <button
              aria-label="上一张"
              className="absolute bottom-3 left-3 z-10 flex size-12 items-center justify-center text-[#f4f5f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f5f2] md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2"
              onClick={(event) => {
                event.stopPropagation();
                move(-1);
              }}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="size-8" strokeWidth={1.5} />
            </button>
            <button
              aria-label="下一张"
              className="absolute bottom-3 right-3 z-10 flex size-12 items-center justify-center text-[#f4f5f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f5f2] md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2"
              onClick={(event) => {
                event.stopPropagation();
                move(1);
              }}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="size-8" strokeWidth={1.5} />
            </button>

            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] md:h-[calc(100dvh-4rem)] md:w-[calc(100vw-10rem)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              onClick={(event) => event.stopPropagation()}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              <Image
                alt={activeItem.alt}
                className="object-contain"
                decoding="async"
                fill
                priority
                sizes="100vw"
                src={activeItem.src}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}







