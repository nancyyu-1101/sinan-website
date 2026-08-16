"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/layout/logo";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/photography", label: "Photography" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

type NavigationProps = {
  visible?: boolean;
};

export function Navigation({ visible = true }: NavigationProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const headerTone =
    "border-b border-white/[0.08] bg-[#0F0F0F]/70 text-[#f4f5f2] backdrop-blur-xl supports-[backdrop-filter]:bg-[#0F0F0F]/55";

  return (
    <>
      <AnimatePresence initial={false}>
        {visible ? (
          <motion.header
        animate={{ opacity: 1, y: 0 }}
        className={
          "fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300 md:h-[4.5rem] " +
          headerTone
        }
        exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="page-shell mx-auto flex h-full items-center">
          <Logo tone="dark" />

          <AnimatePresence initial={false}>
            {visible ? (
              <motion.nav
                animate={{ opacity: 1, y: 0 }}
                aria-label="Primary"
                className="ml-8 hidden items-center gap-8 md:flex"
                exit={{ opacity: 0, y: -8 }}
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      aria-current={active ? "page" : undefined}
                      className="group relative py-2 text-sm font-medium text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
                      href={item.href}
                      key={item.href}
                    >
                      {item.label}
                      <span
                        className={
                          "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-300 " +
                          (active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100")
                        }
                      />
                    </Link>
                  );
                })}
              </motion.nav>
            ) : null}
          </AnimatePresence>

          {visible ? (
            <button
              aria-controls="mobile-site-menu"
              aria-expanded={menuOpen}
              aria-label="打开导航菜单"
              className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center text-current transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:hidden"
              onClick={() => setMenuOpen(true)}
              ref={menuButtonRef}
              type="button"
            >
              <Menu aria-hidden="true" className="size-6" strokeWidth={1.6} />
            </button>
          ) : null}
        </div>
          </motion.header>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            aria-modal="true"
            className="fixed inset-0 z-[60] bg-[#0F0F0F] text-[#f4f5f2] md:hidden"
            exit={{ opacity: 0 }}
            id="mobile-site-menu"
            initial={reduceMotion ? false : { opacity: 0 }}
            role="dialog"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="page-shell flex h-16 items-center">
              <Logo tone="dark" />
              <button
                aria-label="关闭导航菜单"
                className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center transition-transform active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4f5f2]"
                onClick={() => {
                  setMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                ref={closeButtonRef}
                type="button"
              >
                <X aria-hidden="true" className="size-6" strokeWidth={1.6} />
              </button>
            </div>

            <nav
              aria-label="移动端导航"
              className="page-shell flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-12"
            >
              {navItems.map((item, index) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    key={item.href}
                    transition={{
                      duration: 0.45,
                      delay: reduceMotion ? 0 : index * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      aria-current={active ? "page" : undefined}
                      className={
                        "block border-b border-white/15 py-4 text-[clamp(2.5rem,13vw,4.5rem)] font-medium leading-none tracking-[-0.035em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4f5f2] " +
                        (active ? "text-ip-yellow" : "text-[#f4f5f2]")
                      }
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}



