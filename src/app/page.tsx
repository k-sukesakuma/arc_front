'use client';

import Image from 'next/image';
import Header from './components/Header';
import TimeLine from './components/TimeLine';
import Footer from './components/Footer';
import Aside from './components/Aside';

export default function Home() {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />

				<section className="flex-grow">
					<Header />
					<TimeLine />
					<Footer />
				</section>
			</main>
		</div>
	);
}
