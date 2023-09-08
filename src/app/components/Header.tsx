import React from 'react';

const Header = () => {
	return (
		<header className="py-12 px-4 sm:px-6 lg:px-8">
			<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
				<div className="flex items-center justify-center space-x-3">
					<img
						loading="lazy"
						src="/logo.png"
						alt="Logspot"
						className="h-20 w-20"
					/>
					<h1 className="text-4xl font-bold tracking-tight text-slate-700 sm:text-5xl">
						Arc
					</h1>
				</div>
				<p className="mt-4 font-bold text-base leading-7 text-slate-600 ">
					Arcは環境構築不要、Ruby on RailsのO/Rマッパーである
				</p>
				<p className="mt-1 font-bold text-base leading-7 text-slate-600 ">
					ActiveRecordの学習サービスです。
				</p>
			</div>
		</header>
	);
};

export default Header;
