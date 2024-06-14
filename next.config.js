/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['qiita-user-contents.imgix.net'],
	},
};

module.exports = nextConfig;

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
	// config
});
