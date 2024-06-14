'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArticleIcon from '@mui/icons-material/Article';

export default function ArticleLink() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Tooltip title="学習参考記事" placement="right">
				<IconButton>
					<ArticleIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}
