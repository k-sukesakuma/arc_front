import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ChapterCards() {
	const pathname = usePathname();
	const slug = pathname.substring(7);
	return (
		<div>
			<div className="shadow-md p-7 mx-20 rounded-lg bg-white">
				<div className="text-lg text-gray-900 font-bold">概要</div>
				<div className="mt-3 text-gray-700">
					Active Recorderの操作に慣れてみましょう
				</div>
				<div className="text-lg text-gray-900 mt-7 font-bold">問題数</div>
				<div className="mt-3 text-gray-700">全16問</div>
			</div>
			<div className="shadow-md px-6 py-4 my-10 mx-20 rounded-lg bg-white">
				<div className="text-xl font-bold text-gray-900 px-3 mb-2">
					Active Recorderの操作に慣れてみよう！
				</div>
				<hr className="mt-1 mb-2 rounded-lg" />
				<div>
					<div className="px-4 py-3 font-semibold rounded-lg hover:bg-slate-200">
						<Link href={`/works/${slug}`}>allメソッドによるデータの取得</Link>
					</div>
					<div className="px-4 py-3 font-semibold rounded-lg hover:bg-slate-200">
						<Link href={`/works/${slug}`}>allメソッドによるデータの取得</Link>
					</div>
					<div className="px-4 py-3 font-semibold rounded-lg ">
						<Link href={`/works/`}>allメソッドによるデータの取得</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
