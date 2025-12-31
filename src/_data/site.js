export default {
	// Site identity
	name: "PAUSE",
	title: "PAUSE - La revue qui prend son temps",
	subname: "La revue qui prend son temps",
	description: "Une revue mensuelle qui explore des thèmes en profondeur à travers philosophie, sciences, littérature, culture et société.",

	// URLs
	url: "https://www.revue-pause.fr",

	// SEO & Social
	lang: "fr",
	locale: "fr_FR",
	language: "fr", // RSS feed compatibility

	// Author (primary contact)
	author: {
		name: "Émilie Gabiot",
		email: "contact@revue-pause.fr"
	},

	// Social media
	twitter: {
		handle: "@pauserevue",
		card: "summary_large_image"
	},

	// Open Graph defaults
	og: {
		type: "website",
		image: "/images/og-default.png",
		imageWidth: 1200,
		imageHeight: 630
	},

	// Publisher info for structured data
	publisher: {
		name: "PAUSE",
		logo: "/images/logo.png"
	},

	// Contact & Support
	email: "contact@revue-pause.fr",

	// Theme color for mobile browsers
	themeColor: "#1a1a1a",

	// Cloudflare Analytics (set via environment variable)
	cloudflareToken: process.env.CLOUDFLARE_TOKEN || ''
};
