'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import toast, { Toaster } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Alert from '@mui/material/Alert';

import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Aside() {
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
			<></>
			<aside className="border-r w-20 h-screen bg-slate-100 sticky top-0 flex flex-col items-center py-8 flex-shrink-0 justify-between">
				<div>
					<a href="/">
						<Image src="/logo.png" alt="Logspot" width={40} height={40} />
					</a>
					{status !== 'authenticated' ? (
						<Tooltip title="下からログインしてください" placement="bottom">
							<IconButton aria-label="delete">
								<AppsIcon />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip title="問題集一覧" placement="bottom">
							<a href="/works">
								<IconButton aria-label="delete">
									<AppsIcon />
								</IconButton>
							</a>
						</Tooltip>
					)}
				</div>
				{status !== 'authenticated' ? (
					<Tooltip title="ログイン" placement="top">
						<IconButton aria-label="delete" onClick={handleLogin}>
							<LoginIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="ログアウト" placement="top">
						<IconButton onClick={handleLogout}>
							<LogoutIcon />
						</IconButton>
					</Tooltip>
				)}
			</aside>
		</div>
	);
}
