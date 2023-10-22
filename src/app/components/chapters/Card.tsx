'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';

import { useParams } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export default function Card() {
	const fetcher = (url: string) => axios.get(url).then((res) => res.data);

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

	const [data, setData] = useState<{
		chapters: any[];
		description: string;
	} | null>(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`https://current-user-back.onrender.com/api/v1/chapters?slug=${slug}`
			)
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, [slug]);

	return (
		<div>
			{loading ? (
				<div className="flex items-center justify-center h-screen  w-screen">
					<CircularProgress style={{ color: 'grey' }} />
				</div>
			) : (
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20">
						<div className="flex items-center justify-center">
							<h1 className="text-3xl font-semibold tracking-tight text-slate-700">
								{displayChapterName}
							</h1>
						</div>
					</div>
					<div>
						<div className="shadow-md px-6 py-4 mx-20 rounded-lg bg-white">
							<div className="text-xl font-bold text-gray-900 px-3 mb-2">
								【全{data?.chapters?.length}問】 {data?.description}
							</div>

							<hr className="mt-1 mb-2 rounded-lg" />
							<div>
								{data?.chapters?.map((chapter: any, index: number) => (
									<div
										key={index}
										className="px-4 py-3 font-semibold rounded-lg hover:bg-slate-100"
									>
										<Link href={`/works/${slug}/${index + 1}`}>
											{chapter.name}
										</Link>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
