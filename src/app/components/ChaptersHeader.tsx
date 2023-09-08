import React from 'react';
import { usePathname } from 'next/navigation';

export default function WorksHeader() {
	const pathname = usePathname();
	const slug = pathname.substring(7);

	const getChapterName = (slug: String) => {
		switch (slug) {
			case 'trial':
				return 'トライアル編';
			case 'basic':
				return '初級編';
			case 'intermediate':
				return '中級編';
			case 'advanced':
				return '上級編';
		}
	};

	const displayChapterName = getChapterName(slug);

	return (
		<header className="px-4 sm:px-6 lg:px-8">
			<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
				<div className="flex items-center justify-center">
					<h1 className="text-3xl font-semibold tracking-tight text-slate-700">
						{displayChapterName}
					</h1>
				</div>
			</div>
		</header>
	);
}
