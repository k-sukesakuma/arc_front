import React from 'react';

const Header = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<header className="my-20 py-12 px-4 sm:px-6 lg:px-8">
				<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
					<div className="flex items-center justify-center space-x-3">
						<img
							loading="lazy"
							src="/logo.png"
							alt="Logspot"
							className="h-20 w-20"
						/>
						<h1 className="text-5xl font-bold text-slate-700 sm:text-5xl tracking-wide">
							current_user
						</h1>
					</div>
					<p className="mt-6 font-bold text-xl leading-7 text-slate-600 ">
						環境構築不要、Ruby on RailsのO/Rマッパーである
					</p>
					<p className="mt-1 font-bold text-xl leading-7 text-slate-600 ">
						ActiveRecordの学習サービスです。
					</p>
				</div>
			</header>
		</div>
	);
};

export default Header;
