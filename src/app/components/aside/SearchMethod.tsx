'use client';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


export default function SearchMethod() {

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Tooltip title="メソッド検索" placement="right">
				<IconButton>
					<ManageSearchIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}