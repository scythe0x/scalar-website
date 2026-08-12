"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

type HeroSectionProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function HeroSection({ dictionary }: HeroSectionProps) {
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
            className="gothic-bloom"
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 28, filter: "blur(12px)" }
            }
            animate={
              reduceMotion
                ? undefined
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={{
              duration: 1.25,
              delay: 0.08,
              ease: motionConfig.ease,
            }}
          >
            <motion.span style={{ y: reduceMotion ? 0 : titleY }}>
              {dictionary.hero.person}
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
          <p className="hero__role">{dictionary.hero.role}</p>
        </motion.div>

        <motion.div
          className="hero__facts"
          {...enter}
          transition={{
            duration: motionConfig.duration.slow,
            delay: 0.58,
            ease: motionConfig.ease,
          }}
        >
          {dictionary.hero.facts.map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="hero__contacts"
          {...enter}
          transition={{
            duration: motionConfig.duration.slow,
            delay: 0.7,
            ease: motionConfig.ease,
          }}
        >
          <span className="hero__contacts-label">
            {dictionary.hero.contactsLabel}
          </span>
          <Link
            href={siteConfig.socialLinks.telegram}
            target="_blank"
            rel="noreferrer"
          >
            <span>Telegram</span>
            <strong>@scythe0xwork</strong>
            <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
          <Link
            href={siteConfig.socialLinks.blog}
            target="_blank"
            rel="noreferrer"
          >
            <span>{dictionary.hero.channelLabel}</span>
            <strong>@scythe0xblog</strong>
            <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
          <Link href={`mailto:${siteConfig.email}`}>
            <span>Email</span>
            <strong>{siteConfig.email}</strong>
            <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
