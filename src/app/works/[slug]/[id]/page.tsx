'use client';
import React, { useRef } from 'react';
import Aside from '@/app/components/Aside';
import CodeEditor from '@/app/components/CodeEditor';
import ChaptersHeader from '@/app/components/ChaptersHeader';

const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<ChaptersHeader />
					<CodeEditor />
				</section>
			</main>
		</div>
	);
};

export default page;
