'use client';

import Image from 'next/image';
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import TimeLine from './components/TimeLine';
import Footer from './components/Footer';

import Motion from './components/motionWrapper/MotionWrapper';

import { useSession } from 'next-auth/react';

import Login from './components/Login';
import Logout from './components/Logout';

export default function Home() {
	const { data: session, status } = useSession();
	return (
		<div>
			{status === 'authenticated' ? (
				<div>
					<p>セッションの期限：{session.expires}</p>
					<p>ようこそ、{session.user?.name}さん</p>
					<img
						src={session.user?.image ?? ``}
						alt=""
						style={{ borderRadius: '50px' }}
					/>
					<div>
						<Logout />
					</div>
				</div>
			) : (
				<Login />
			)}
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
