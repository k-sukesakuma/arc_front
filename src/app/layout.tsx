import './globals.css';
import type { Metadata } from 'next';
import NextAuthProvider from '@/providers/NextAuth';

export const metadata: Metadata = {
	title: 'ActiveRecord学習サービス | current_user',
	description: '環境構築不要のActiveRecord学習サービス',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	);
}
