import Image from 'next/image';
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import TimeLine from './components/TimeLine';
import Footer from './components/Footer';

import Motion from './components/motionWrapper/MotionWrapper';

export default async function Home() {
	return (
		<div>
			<Motion>
				<main className="relative">
					<section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 overflow-hidden">
						<Header />
					</section>
				</main>
				<LoginButton />
				<TimeLine />
				<Footer />
			</Motion>
		</div>
	);
}
