'use client';

import Image from 'next/image';
import Header from './components/top/Header';
import TimeLine from './components/top/TimeLine';
import Footer from './components/top/Footer';
import Aside from './components/aside/Aside';

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
