'use client';
import React, { useRef } from 'react';
import Aside from '@/app/components/Aside';
import ChaptersHeader from '@/app/components/ChaptersHeader';
import ChapterCards from '@/app/components/ChapterCards';

import Motion from '@/app/components/motionWrapper/MotionWrapper';

const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<Motion>
						<ChaptersHeader />
						<ChapterCards />
					</Motion>
				</section>
			</main>
		</div>
	);
};

export default page;
