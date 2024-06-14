import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AuthenticateButton() {
	return (
		<div>
			<Tooltip title="" placement="bottom">
				<IconButton>
					<LogoutIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
}
