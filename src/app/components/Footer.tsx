import React from 'react';

const Footer = () => {
	return (
		<footer className="px-4 sm:px-6 lg:px-8">
			<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-10">
				<div className="flex items-center justify-center space-x-5 my-5">
					<p className="mt-2 font-bold text-base leading-7 text-slate-600 ">
						利用規約
					</p>
					<p className="mt-2 font-bold text-base leading-7 text-slate-600 ">
						プライバシーポリシー
					</p>
					<p className="mt-2 font-bold text-base leading-7 text-slate-600 ">
						お問い合わせ
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
