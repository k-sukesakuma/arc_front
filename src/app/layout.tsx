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
		card: 'app',
		title: 'Next.js',
		description: 'The React Framework for the Web',
		siteId: '1467726470533754880',
		creator: '@nextjs',
		creatorId: '1467726470533754880',
		images: {
			url: 'https://current-user.vercel.app/twitter-image.png',
			alt: 'Next.js Logo',
		},
		app: {
			name: 'twitter_app',
			id: {
				iphone: 'twitter_app://iphone',
				ipad: 'twitter_app://ipad',
				googleplay: 'twitter_app://googleplay',
			},
			url: {
				iphone: 'https://iphone_url',
				ipad: 'https://ipad_url',
			},
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<NextAuthProvider>
					<Toaster position="bottom-center" reverseOrder={true} />
					{children}
				</NextAuthProvider>
			</body>
		</html>
	);
}
