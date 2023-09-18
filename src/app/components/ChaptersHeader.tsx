import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function WorksHeader() {
	const pathname = usePathname();
	const slug = pathname.substring(7);
	const [data, setData] = useState<Data | null>(null);

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

	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/v1/chapters?slug=${slug}`)
			.then((res) => {
				setData(res.data);
				console.log(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [slug]);

	type Chapter = {
		name: string;
	};

	type Data = {
		chapters: Chapter[];
		description: string;
	};

	return (
		<header className="px-4 sm:px-6 lg:px-8">
			<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
				<div className="flex items-center justify-center">
					<h1 className="text-3xl font-semibold tracking-tight text-slate-700">
						{displayChapterName}
					</h1>
				</div>
			</div>
			<div>
				<div className="shadow-md px-6 py-4 my-10 mx-20 rounded-lg bg-white">
					<div className="text-xl font-bold text-gray-900 px-3 mb-2">
						【全{data && data.chapters.length}問】 {data && data.description}
					</div>
					<hr className="mt-1 mb-2 rounded-lg" />
					<div>
						{data &&
							data.chapters.map((chapter: any, index: any) => (
								<div
									key={index}
									className="px-4 py-3 font-semibold rounded-lg hover:bg-slate-200"
								>
									<Link href={`/works/${slug}/${index + 1}`}>
										{chapter.name}
									</Link>
								</div>
							))}
					</div>
				</div>
			</div>
		</header>
	);
}
