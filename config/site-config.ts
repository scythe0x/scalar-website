export const siteConfig = {
	name: "scythe0x",
	person: "scythe0x",
	email: "scythe0x@proton.me",
	features: {
		customCursor: false,
	},
	socialLinks: {
		telegram: "https://t.me/scythe0xwork",
		blog: "https://t.me/scythe0xblog",
		github: "https://github.com/scythe0x",
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
