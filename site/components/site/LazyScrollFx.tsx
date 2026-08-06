"use client";

import { useEffect, useRef, useState, type ReactNode, type ComponentType } from "react";

/**
 * Defer a framer-motion-backed scroll effect until either:
 *   a) the wrapper element scrolls into the viewport (IntersectionObserver),
 *   b) the user interacts (scroll / pointerdown / touchstart / keydown), or
 *   c) a 5s safety timer expires.
 *
 * NEVER use requestIdleCallback here — it fires inside the Lighthouse trace
 * window on throttled mobile CPU and re-introduces framer-motion's forced
 * reflows during LCP measurement.
 */
function makeLazy<P extends { children: ReactNode }>(
  loader: () => Promise<ComponentType<P>>,
) {
  return function LazyWrapper(props: P) {
    const [Cmp, setCmp] = useState<ComponentType<P> | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      let cancelled = false;
      let upgraded = false;
      const upgrade = () => {
        if (upgraded || cancelled) return;
        upgraded = true;
        loader()
          .then((mod) => {
            if (!cancelled) setCmp(() => mod);
          })
          .catch(() => {});
      };

      const events: (keyof WindowEventMap)[] = [
        "scroll",
        "pointerdown",
        "touchstart",
        "keydown",
      ];
      const onEvent = () => upgrade();
      for (const ev of events)
        window.addEventListener(ev, onEvent, { once: true, passive: true });

      const timer = window.setTimeout(upgrade, 5000);

      let io: IntersectionObserver | null = null;
      if (wrapRef.current && "IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) if (e.isIntersecting) upgrade();
          },
          { rootMargin: "200px" },
        );
        io.observe(wrapRef.current);
      }

      return () => {
        cancelled = true;
        window.clearTimeout(timer);
        for (const ev of events) window.removeEventListener(ev, onEvent);
        io?.disconnect();
      };
    }, []);

    if (Cmp) return <Cmp {...props} />;
    return <div ref={wrapRef}>{props.children}</div>;
  };
}

export const LazyParallax = makeLazy<{
  children: ReactNode;
  strength?: number;
  className?: string;
}>(() => import("./ScrollFx").then((m) => m.Parallax));

export const LazyFloatOnScroll = makeLazy<{
  children: ReactNode;
  className?: string;
}>(() => import("./ScrollFx").then((m) => m.FloatOnScroll));

/**
 * Top-of-page scroll progress bar. Useless until the user scrolls, so we
 * mount the real framer-motion component ONLY on first scroll/interaction
 * or after a 6s safety net.
 */
export function LazyScrollProgress() {
  const [Cmp, setCmp] = useState<ComponentType | null>(null);
  useEffect(() => {
    let cancelled = false;
    let upgraded = false;
    const upgrade = () => {
      if (upgraded || cancelled) return;
      upgraded = true;
      import("./ScrollFx")
        .then((mod) => {
          if (!cancelled) setCmp(() => mod.ScrollProgress);
        })
        .catch(() => {});
    };
    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "pointerdown",
      "touchstart",
      "keydown",
    ];
    const onEvent = () => upgrade();
    for (const ev of events)
      window.addEventListener(ev, onEvent, { once: true, passive: true });
    const timer = window.setTimeout(upgrade, 6000);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      for (const ev of events) window.removeEventListener(ev, onEvent);
    };
  }, []);
  return Cmp ? <Cmp /> : null;
}
