import React from 'react';
import Link from 'next/link';
import Motion from '@/app/components/motionWrapper/motionWrapper';

export default function Card() {
	return (
		<div>
			<header>
				<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
					<div className="flex items-center justify-center">
						<h1 className="text-3xl font-semibold tracking-tight text-slate-700">
							問題集一覧
						</h1>
					</div>
				</div>
			</header>
			<Motion>
				<div className="flex justify-around">
					<div className="flex-1 my-4 mx-4 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<Link href="/works/trial">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								トライアル編
							</h5>
						</Link>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							操作に慣れてみよう!
						</p>
						<Link
							href="/works/trial"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded-lg hover:bg-slate-500"
						>
							こちらから
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
					<div className="flex-1 m-4 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<Link href="/works/basic">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								初級編
							</h5>
						</Link>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							current_userを使ってデータを取得してみよう!
						</p>
						<Link
							href="/works/basic"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded-lg hover:bg-slate-500"
						>
							こちらから
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
				<div className="flex justify-around">
					<div className="flex-1 m-4 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<Link href="/works/intermediate">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								中級編
							</h5>
						</Link>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							複雑な条件でデータを取得してみよう!
						</p>
						<Link
							href="/works/intermediate"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded-lg hover:bg-slate-500"
						>
							こちらから
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
					<div className="flex-1 m-4 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<Link href="/works/advanced">
							<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								上級編
							</h5>
						</Link>
						<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
							複数テーブルの複雑な条件でデータを取得してみよう!
						</p>
						<Link
							href="/works/advanced"
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded-lg hover:bg-slate-500"
						>
							こちらから
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
			</Motion>
		</div>
	);
}
