'use client';
import SearchMethod from './SearchMethod';
import ArticleLink from './ArticleLink';
import React from 'react';

import Logo from './Logo';
import WorksLink from './WorksLink';
import ChaptersLink from './ChaptersLink';
import AuthenticateButton from './AuthenticateButton';

export default function Aside() {
	return (
		<div>
			<aside className="border-r w-20 h-screen bg-slate-100 sticky top-0 flex flex-col items-center py-8 flex-shrink-0 justify-between">
				<div>
					<Logo />
					<WorksLink />
					<ChaptersLink />
					<SearchMethod />
					<ArticleLink />
				</div>
				<AuthenticateButton />
			</aside>
		</div>
	);
}
