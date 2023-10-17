import React from 'react';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className="px-4 sm:px-6 lg:px-8">
			<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-10">
				<div className="flex items-center justify-center space-x-5 my-5">
					<p className="mt-2 font-bold text-base leading-7 text-slate-600 ">
						<Link href="/term_of_service">利用規約</Link>
					</p>
					<p className="mt-2 font-bold text-base leading-7 text-slate-600 ">
						<Link href="/privacy_policy">プライバシーポリシー</Link>
					</p>
					<p className="mt-2 font-bold text-base leading-7 text-slate-600 ">
						<Link href="https://twitter.com/saku0suke" target="_blank">
							お問い合わせ
						</Link>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
