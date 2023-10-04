import Layout from '@/app/layout';
import React from 'react';
import { Metadata } from 'next';

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

export default Layout;
