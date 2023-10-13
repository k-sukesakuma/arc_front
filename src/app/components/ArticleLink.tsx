'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArticleIcon from '@mui/icons-material/Article';

export default function ArticleLink() {
	const { data: session, status } = useSession();
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{status !== 'authenticated' ? (
				<Tooltip title="下からログインしてください" placement="right">
					<IconButton aria-label="chapter">
						<ArticleIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="学習参考記事" placement="right">
					<a href="/articles">
						<IconButton>
							<ArticleIcon />
						</IconButton>
					</a>
				</Tooltip>
			)}
		</div>
	);
}
