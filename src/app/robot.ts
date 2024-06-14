import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: 'Twitterbot',
			allow: '/app/*',
			disallow: '/private/',
		},
		sitemap: 'https://acme.com/sitemap.xml',
	};
}
