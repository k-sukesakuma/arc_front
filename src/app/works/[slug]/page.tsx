'use client';
import React from 'react';
import Aside from '@/app/components/aside/Aside';
import Card from '@/app/components/chapters/Card';
const page = () => {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
			</main>
		</div>
	);
};

export default page;
