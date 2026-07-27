export const siteConfig = {
  name: "SCALAR",
  person: "Sergey Shabalin",
  email: "whoiscyberial@gmail.com",
  features: {
    customCursor: false,
  },
  socialLinks: {
    telegram: "https://t.me/zerocommits",
    community: "https://t.me/scalarops",
    github: "https://github.com/whoiscyberial",
    linkedin: "",
    x: "",
  },
} as const;

export const motionConfig = {
  duration: {
    fast: 0.2,
    normal: 0.45,
    slow: 0.8,
  },
  ease: [0.22, 1, 0.36, 1] as const,
} as const;
