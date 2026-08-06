"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Variant = "fade" | "bounce" | "zoom" | "tilt";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  variant?: Variant;
};

function useInView(once: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return { ref, shown };
}

/**
 * Scroll-triggered reveal. Pure CSS transition driven by IntersectionObserver
 * — no animation library. Mirrors the previous framer-motion API.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  variant = "bounce",
}: RevealProps) {
  const { ref, shown } = useInView(once);

  const transition =
    variant === "fade"
      ? "transform 0.55s cubic-bezier(.16,1,.3,1), opacity 0.55s cubic-bezier(.16,1,.3,1), filter 0.55s cubic-bezier(.16,1,.3,1)"
      : "transform 0.7s cubic-bezier(.18,1.25,.32,1), opacity 0.55s cubic-bezier(.16,1,.3,1), filter 0.55s cubic-bezier(.16,1,.3,1)";

  let hidden: CSSProperties;
  if (variant === "zoom") {
    hidden = { opacity: 0, transform: `translateY(18px) scale(0.88)` };
  } else if (variant === "tilt") {
    hidden = { opacity: 0, transform: `translateY(${y}px) rotate(-3deg) scale(0.96)` };
  } else {
    hidden = { opacity: 0, transform: `translateY(${y}px)`, filter: "blur(8px)" };
  }

  const visible: CSSProperties = {
    opacity: 1,
    transform: "translateY(0) scale(1) rotate(0)",
    filter: "blur(0)",
  };

  const style: CSSProperties = {
    ...(shown ? visible : hidden),
    transition,
    transitionDelay: `${delay}s`,
    willChange: shown ? undefined : "transform, opacity",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * Stagger container — children get a small ramp delay via CSS variable.
 */
export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  const { ref, shown } = useInView(once);
  return (
    <div
      ref={ref}
      className={className}
      data-shown={shown ? "true" : "false"}
      style={{ ["--reveal-stagger" as string]: `${stagger}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Child variant for RevealStagger.
 */
export function RevealItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    setIdx(Array.prototype.indexOf.call(parent.children, el));
    const check = () => setShown(parent.getAttribute("data-shown") === "true");
    check();
    const mo = new MutationObserver(check);
    mo.observe(parent, { attributes: true, attributeFilter: ["data-shown"] });
    return () => mo.disconnect();
  }, []);

  const style: CSSProperties = shown
    ? {
        opacity: 1,
        transform: "translateY(0) scale(1)",
        transition:
          "transform 0.7s cubic-bezier(.18,1.25,.32,1), opacity 0.55s cubic-bezier(.16,1,.3,1)",
        transitionDelay: `calc(var(--reveal-stagger, 0.08s) * ${idx})`,
      }
    : {
        opacity: 0,
        transform: `translateY(${y}px) scale(0.94)`,
        transition:
          "transform 0.7s cubic-bezier(.18,1.25,.32,1), opacity 0.55s cubic-bezier(.16,1,.3,1)",
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// Re-export scroll-linked effects from the framer-motion module so that
// existing imports keep working. Prefer importing these directly from
// `./ScrollFx` (or via next/dynamic) when you want code-splitting.
export { Parallax, FloatOnScroll, ScrollProgress } from "./ScrollFx";
