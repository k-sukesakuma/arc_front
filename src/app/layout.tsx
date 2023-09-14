import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'ActiveRecord学習サービス | Arc',
	description: '環境構築不要のActiveRecord学習サービス',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
