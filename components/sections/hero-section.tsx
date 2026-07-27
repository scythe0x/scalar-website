"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import type { Dictionary } from "@/content/dictionaries";
import type { Locale } from "@/lib/i18n";
import { motionConfig, siteConfig } from "@/config/site-config";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HeroSection({ locale, dictionary }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 96]), {
    stiffness: 100,
    damping: 26,
    mass: 0.4,
  });
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1, 1, 0],
  );
  const enter = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 24, filter: "blur(8px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      };

  return (
    <section
      ref={sectionRef}
      className="hero"
      aria-labelledby="hero-title"
      data-background-scene="hero"
    >
      <motion.div
        className="hero__content"
        style={{ opacity: reduceMotion ? 1 : contentOpacity }}
      >
        <div className="hero__title-wrap">
          <motion.h1
            id="hero-title"
            initial={reduceMotion ? false : { y: "112%" }}
            animate={reduceMotion ? undefined : { y: 0 }}
            transition={{
              duration: 1.15,
              delay: 0.08,
              ease: motionConfig.ease,
            }}
          >
            <motion.span style={{ y: reduceMotion ? 0 : titleY }}>
              {dictionary.hero.title}
            </motion.span>
          </motion.h1>
        </div>

        <motion.div
          className="hero__information"
          {...enter}
          transition={{
            duration: motionConfig.duration.slow,
            delay: 0.5,
            ease: motionConfig.ease,
          }}
        >
          <div>
            <p className="hero__person">{dictionary.hero.person}</p>
            <p className="hero__role">{dictionary.hero.role}</p>
          </div>
          <div className="hero__pitch">
            <p className="hero__statement">{dictionary.hero.statement}</p>
          </div>
        </motion.div>

        <motion.div
          className="hero__actions"
          {...enter}
          transition={{
            duration: motionConfig.duration.slow,
            delay: 0.68,
            ease: motionConfig.ease,
          }}
        >
          <Button asChild variant="primary">
            <Link href={`/${locale}#work`}>
              {dictionary.hero.primaryAction}
              <ArrowDown aria-hidden="true" size={17} />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link
              href={siteConfig.socialLinks.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.hero.secondaryAction}
              <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
