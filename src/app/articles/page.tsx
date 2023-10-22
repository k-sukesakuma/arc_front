import React from 'react';
import Aside from '../components/aside/Aside';
import QiitaArticle from '../components/aside/QiitaArticle';

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
