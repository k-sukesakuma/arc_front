import React from 'react';
import Image from 'next/image';
import Motion from '@/app/components/motionWrapper/motionWrapper';
import Link from 'next/link';

const Header = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Motion>
				<header className="my-10 py-12 px-4 sm:px-6 lg:px-8">
					<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
						<div className="flex items-center justify-center space-x-3">
							<Image src="/logo.png" alt="" width={110} height={110} />				
						</div>
						<div className='mt-7'>
							<h1 className="text-2xl font-bold text-slate-600 sm:text-4xl">
								メンテナンス中
							</h1>
						</div>
						<div className='mt-7'>
	  				        <p className='text-gray-400'>
							    current_user.はただいまメンテナンス中です。
						    </p>
						    <p className='text-gray-400'>
						        お問い合わせは
							    <Link href="https://twitter.com/saku0suke" target="_blank" className='underline font-semibold'>こちら</Link>
						        までお願いします。
						    </p>
						</div>
					</div>
				</header>
			</Motion>
		</div>
	);
};

export default Header;
