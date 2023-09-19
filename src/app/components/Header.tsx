import React from 'react';
import Image from 'next/image';

const Header = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<header className="my-20 py-12 px-4 sm:px-6 lg:px-8">
				<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
					<div className="flex items-center justify-center space-x-3">
						<Image src="/logo.png" alt="Logspot" width={90} height={90} />
						<h1 className="ml-5 text-6xl font-bold text-slate-600 sm:text-7xl tracking-wide">
							current_user.
						</h1>
					</div>
					<p className="mt-6 font-semibold text-2xl leading-7 text-slate-500 ">
						環境構築不要、Ruby on RailsのO/Rマッパーである
					</p>
					<p className="mt-1 font-semibold text-2xl leading-7 text-slate-500 ">
						ActiveRecordの学習サービスです。
					</p>
				</div>
			</header>
		</div>
	);
};

export default Header;
