import React from 'react';
import Aside from '../components/Aside';
import QiitaArticle from '../components/QiitaArticle';

export default function page() {
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />

				<QiitaArticle />
			</main>
		</div>
	);
}
