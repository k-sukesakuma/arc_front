import './globals.css';
import type { Metadata } from 'next';
import NextAuthProvider from '@/providers/NextAuth';

import { Analytics } from '@vercel/analytics/react';

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	metadataBase: new URL('https://current-user.vercel.app/'),
	title: 'ActiveRecord学習サービス | current_user.',
	description: '環境構築不要のActiveRecord学習サービス',
	openGraph: {
		title: 'ActiveRecord学習サービス | current_user.',
		description: '環境構築不要のActiveRecord学習サービス',
	},
	twitter: {
		title: 'ActiveRecord学習サービス | current_user.',
		description: '環境構築不要のActiveRecord学習サービス',
		card: 'summary_large_image',
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
				<Analytics />
			</body>
		</html>
	);
}
