'use client';
import React from 'react';
import Aside from '../components/Aside';
import WorksHeader from '../components/WorksHeader';
import Cards from '../components/Cards';

const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<WorksHeader />
					<Cards />
				</section>
			</main>
		</div>
	);
};

export default page;
