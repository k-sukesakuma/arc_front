'use client';
import React from 'react';
import Aside from '@/app/components/Aside';
import ChaptersHeader from '@/app/components/ChaptersHeader';

const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<ChaptersHeader />
				</section>
			</main>
		</div>
	);
};

export default page;
