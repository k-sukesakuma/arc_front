import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function InterMediateButton() {
	const { data: session, status } = useSession();
	return (
		<div className="flex-1 m-4 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				中級編
			</h5>
			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
				複雑な条件でデータを取得してみよう!
			</p>
			{status !== 'authenticated' ? (
				<Link
					href=""
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg"
				>
					ログイン後に選択可能です。
				</Link>
			) : (
				<Link
					href="/works/intermediate"
					className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800 rounded-lg hover:bg-gray-200 hover:text-slate-800"
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
			)}
		</div>
	);
}
