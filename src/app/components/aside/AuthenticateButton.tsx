import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

export default function AuthenticateButton() {
	const handleLogin = async () => {
		signIn('github', { callbackUrl: '/works' }),
			toast.loading('ログインを開始しています...');
	};

	const handleLogout = async () => {
		signOut({ callbackUrl: '/' }), toast.loading('ログアウトをしています...');
	};

	const { data: session, status } = useSession();
	return (
		<div>
			{status !== 'authenticated' ? (
				<Tooltip title="ログインする" placement="bottom">
					<IconButton aria-label="delete" onClick={handleLogin}>
						<LoginIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="ログアウトする" placement="bottom">
					<IconButton onClick={handleLogout}>
						<LogoutIcon />
					</IconButton>
				</Tooltip>
			)}
		</div>
	);
}
