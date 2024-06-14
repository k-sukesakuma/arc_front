import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function ChaptersLink() {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Tooltip title="チャプター" placement="right">
				<IconButton>
					<FormatListBulletedIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}
