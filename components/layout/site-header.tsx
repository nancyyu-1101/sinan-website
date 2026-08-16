"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { Navigation } from "@/components/layout/navigation";

const homeFinalFrameProgress = 0.84;
const homeResetOffset = 24;
const homeMinimumRevealViewport = 0.9;

type HomeChromeState = {
  pathname: string;
  visible: boolean;
};

function getHomeRevealPoint() {
  const hero = document.querySelector<HTMLElement>("[data-home-hero]");

  if (!hero) return Number.POSITIVE_INFINITY;

  const heroTop = hero.getBoundingClientRect().top + window.scrollY;
  const heroScrollDistance = Math.max(hero.offsetHeight - window.innerHeight, 0);
  const minimumRevealPoint = heroTop + window.innerHeight * homeMinimumRevealViewport;

  return Math.max(
    minimumRevealPoint,
    heroTop + heroScrollDistance * homeFinalFrameProgress,
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const isHome = pathname === "/";
  const previousScrollY = useRef(0);
  const [homeChrome, setHomeChrome] = useState<HomeChromeState>({
    pathname: "",
    visible: false,
  });
  const homeChromeVisible =
    homeChrome.pathname === pathname ? homeChrome.visible : false;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const initialScrollY = scrollY.get();
      previousScrollY.current = initialScrollY;
      const visible = isHome
        ? initialScrollY > homeResetOffset &&
          initialScrollY >= getHomeRevealPoint()
        : true;

      setHomeChrome({ pathname, visible });
    });

    return () => cancelAnimationFrame(frame);
  }, [isHome, pathname, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isHome) return;

    const scrollingDown = latest > previousScrollY.current;
    previousScrollY.current = latest;
    const revealPoint = getHomeRevealPoint();

    setHomeChrome((current) => {
      let visible = current.pathname === pathname ? current.visible : false;

      if (scrollingDown && latest >= revealPoint) visible = true;
      if (latest < revealPoint - homeResetOffset) visible = false;

      if (current.pathname === pathname && current.visible === visible) {
        return current;
      }

      return { pathname, visible };
    });
  });

  const shouldShowNavigation = !isHome || homeChromeVisible;
  return <Navigation visible={shouldShowNavigation} />;
}


