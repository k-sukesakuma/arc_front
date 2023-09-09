'use client';
import React, { useRef } from 'react';
import Aside from '@/app/components/Aside';
import ChaptersHeader from '@/app/components/ChaptersHeader';
import ChapterCards from '@/app/components/ChapterCards';

const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<ChaptersHeader />
					<ChapterCards />
				</section>
			</main>
		</div>
	);
};

export default page;
