'use client';
import React from 'react';
import Aside from '@/app/components/Aside';
import Card from '@/app/components/chapters/Card';
const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<Card />
				</section>
			</main>
		</div>
	);
};

export default page;
