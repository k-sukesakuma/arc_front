import './globals.css';
import type { Metadata } from 'next';
import NextAuthProvider from '@/providers/NextAuth';

import toast, { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	title: 'ActiveRecord学習サービス | current_user.',
	description: '環境構築不要のActiveRecord学習サービス',
	openGraph: {
		title: 'ActiveRecord学習サービス | current_user.',
		url: 'https://current-user.vercel.app/opengraph-image.jpg',
		description:
			'環境構築不要、Ruby on RailsのO/RマッパーであるActiveRecordの学習サービスです。',
		images: [
			{
				url: 'https://current-user.vercel.app/opengraph-image.jpg',
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ActiveRecord学習サービス | current_user.',
		description:
			'環境構築不要、Ruby on RailsのO/RマッパーであるActiveRecordの学習サービスです。',
		creator: '@saku0suke',
		images: [
			{
				url: 'https://current-user.vercel.app/twitter-image.jpg',
				width: 1200,
				height: 630,
				alt: 'current-user',
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<meta
				name="twitter:image"
				content="https://current-user.vercel.app/twitter-image.jpg"
			></meta>
			<body>
				<NextAuthProvider>
					<Toaster position="bottom-center" reverseOrder={true} />
					{children}
				</NextAuthProvider>
			</body>
		</html>
	);
}
