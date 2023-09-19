import './globals.css';
import type { Metadata } from 'next';
import NextAuthProvider from '@/providers/NextAuth';

import toast, { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	title: 'ActiveRecord学習サービス | current_user',
	description: '環境構築不要のActiveRecord学習サービス',
	openGraph: {
		title: 'ActiveRecord学習サービス | current_user',
		description:
			'環境構築不要、Ruby on RailsのO/RマッパーであるActiveRecordの学習サービスです。',
		images: ['http://localhost:3000/currentuser.jpg'],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'current_user',
		description:
			'環境構築不要、Ruby on RailsのO/RマッパーであるActiveRecordの学習サービスです。',
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
