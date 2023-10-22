import { IconButton, Tooltip } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';

export default function WorksLink() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Tooltip title="問題集" placement="right">
				<Link href="/works">
					<IconButton aria-label="works">
						<AppsIcon />
					</IconButton>
				</Link>
			</Tooltip>
		</div>
	);
}
