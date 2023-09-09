'use client';
import React from 'react';
import Aside from '../components/Aside';
import WorksHeader from '../components/WorksHeader';
import Cards from '../components/Cards';

import Motion from '../components/motionWrapper/MotionWrapper';

const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<Motion>
						<WorksHeader />
						<Cards />
					</Motion>
				</section>
			</main>
		</div>
	);
};

export default page;
