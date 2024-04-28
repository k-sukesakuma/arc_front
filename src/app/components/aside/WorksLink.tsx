import { IconButton, Tooltip } from '@mui/material';
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
				<IconButton aria-label="works">
					<AppsIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}
