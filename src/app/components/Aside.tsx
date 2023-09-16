import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Aside() {
	const { data: session, status } = useSession();
	return (
		<aside className="border-r w-20 h-screen bg-slate-100 sticky top-0 flex flex-col items-center py-8 flex-shrink-0 justify-between">
			<div>
				<a href="/">
					<img
						loading="lazy"
						src="/logo.png"
						alt="Logspot"
						className="h-10 w-15"
					/>
				</a>
				<Tooltip title="問題集一覧" placement="bottom">
					<IconButton aria-label="delete">
						<AppsIcon />
					</IconButton>
				</Tooltip>
			</div>
			{status !== 'authenticated' ? (
				<Tooltip title="ログイン" placement="top">
					<IconButton
						aria-label="delete"
						onClick={() => signIn('google', {}, {})}
					>
						<LogoutIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="ログアウト" placement="top">
					<IconButton aria-label="delete" onClick={() => signOut()}>
						<LogoutIcon />
					</IconButton>
				</Tooltip>
			)}
		</aside>
	);
}
