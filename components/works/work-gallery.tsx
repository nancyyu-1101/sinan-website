"use client";

import Image from "next/image";
import { useState } from "react";

type WorkGalleryProps = {
  alt: string;
  captions?: string[];
  images: string[];
  title: string;
};

export function WorkGallery({
  alt,
  captions = [],
  images,
  title,
}: WorkGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  return (
    <figure className="mx-auto w-full max-w-[920px]">
      <div
        className="group relative aspect-video w-full overflow-hidden rounded-[16px] bg-[#151515]"
        role={hasMultipleImages ? "group" : undefined}
        aria-label={hasMultipleImages ? `${title} 项目图片` : undefined}
      >
        <Image
          alt={`${alt}${hasMultipleImages ? ` ${activeIndex + 1}` : ""}`}
          className="object-cover transition duration-700 ease-out motion-reduce:transition-none"
          fill
          priority
          quality={100}
          sizes="(max-width: 1023px) calc(100vw - 2.5rem), 920px"
          src={activeImage}
          unoptimized
        />

        {hasMultipleImages ? (
          <div
            className="absolute inset-x-0 bottom-5 flex justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              aria-label="项目图片切换"
              className="flex items-center gap-1.5 rounded-full bg-black/10 px-2 py-2 backdrop-blur-sm"
            >
              {images.map((image, index) => (
                <button
                  aria-label={`查看第 ${index + 1} 张图片`}
                  aria-current={index === activeIndex}
                  className="h-1 w-12 rounded-full bg-white/45 transition hover:bg-white/75 aria-current:bg-[#f4f5f2] sm:w-14"
                  key={image}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <figcaption className="sr-only">
        {captions[activeIndex] ?? `${title} 第 ${activeIndex + 1} 张图片`}
      </figcaption>
    </figure>
  );
}
