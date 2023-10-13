'use client';

import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';

import { SiQiita } from 'react-icons/si';
import CircularProgress from '@mui/material/CircularProgress';

const fetcher = (url: string) => {
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
		},
	}).then((res) => res.json());
};

export default function QiitaArticle() {
	const { data, error } = useSWR(
		'https://qiita.com/api/v2/items?query=title:ActiveRecord&per_page=50',
		fetcher,
		{ dedupingInterval: 600000 }
	);

	if (error)
		return (
			<div className="flex items-center justify-center h-screen  w-screen">
				記事の取得に失敗しました。
			</div>
		);

	const articles = data?.filter((article: any) => article.likes_count >= 5);

	if (!articles)
		return (
			<div className="flex items-center justify-center h-screen  w-screen">
				<CircularProgress style={{ color: 'grey' }} />
			</div>
		);

	return (
		<div>
			<header className="px-4 sm:px-6 lg:px-8">
				<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
					<div className="flex items-center justify-center">
						<h1 className="text-3xl font-semibold tracking-tight text-slate-700">
							学習参考記事
						</h1>
					</div>
				</div>
			</header>
			<div className="flex flex-wrap justify-around">
				{articles.map((article: any) => (
					<div
						key={article.id}
						className="m-4 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
						style={{ width: '47%' }}
					>
						<div key={article.id}>
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								<SiQiita size={50} />
								{article.title}
							</h5>
							<p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
							<Link
								href={article.url}
								className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded-lg hover:bg-slate-500"
								target="_blank"
							>
								詳しく見る
								<svg
									className="w-3.5 h-3.5 ml-2"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 10"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M1 5h12m0 0L9 1m4 4L9 9"
									/>
								</svg>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
