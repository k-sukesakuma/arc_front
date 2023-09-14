'use client';
import React, { useState } from 'react';
import Aside from '@/app/components/Aside';
import CodeEditor from '@/app/components/CodeEditor';
import ChaptersHeader from '@/app/components/ChaptersHeader';

const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<div className="shadow-md px-6 py-4 my-5 mx-10 rounded-lg bg-white">
						<div className="text-xl font-bold text-gray-900 px-3 mb-2">
							allメソッドによるデータの取得
						</div>
						<hr className="mt-1 mb-2 rounded-lg" />
						<div>
							<div className="px-4 py-3 font-semibold rounded-lg">
								allメソッドを使用して、usersテーブルのレコードを全て取得してください。
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default page;
