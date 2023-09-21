import './globals.css';
import type { Metadata } from 'next';
import NextAuthProvider from '@/providers/NextAuth';

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	metadataBase: new URL('https://current-user.vercel.app/'),
	title: 'ActiveRecord学習サービス | current_user.',
	description: '環境構築不要のActiveRecord学習サービス',
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
