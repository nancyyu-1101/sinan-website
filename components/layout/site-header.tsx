"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { Navigation } from "@/components/layout/navigation";

const homeFinalFrameProgress = 0.84;
const homeResetOffset = 24;

function getHomeRevealPoint() {
  const hero = document.querySelector<HTMLElement>("[data-home-hero]");

  if (!hero) return Number.POSITIVE_INFINITY;

  const heroTop = hero.getBoundingClientRect().top + window.scrollY;
  const heroScrollDistance = Math.max(hero.offsetHeight - window.innerHeight, 0);

  return heroTop + heroScrollDistance * homeFinalFrameProgress;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const isHome = pathname === "/";
  const previousScrollY = useRef(0);
  const [homeChromeVisible, setHomeChromeVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const initialScrollY = scrollY.get();
      previousScrollY.current = initialScrollY;
      setHomeChromeVisible(
        isHome ? initialScrollY >= getHomeRevealPoint() : true,
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [isHome, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isHome) return;

    const scrollingDown = latest > previousScrollY.current;
    previousScrollY.current = latest;
    const revealPoint = getHomeRevealPoint();

    setHomeChromeVisible((current) => {
      if (scrollingDown && latest >= revealPoint) return true;
      if (latest < revealPoint - homeResetOffset) return false;
      return current;
    });
  });

  const shouldShowNavigation = !isHome || homeChromeVisible;
  return <Navigation visible={shouldShowNavigation} />;
}


