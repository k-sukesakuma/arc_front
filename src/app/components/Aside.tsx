'use client';

import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { toast } from 'react-toastify';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Aside() {
	const [showAlert, setShowAlert] = useState(false);
	const { data: session, status } = useSession();
	const [showLoginAlert, setShowLoginAlert] = useState(false);
	const [showLogoutAlert, setShowLogoutAlert] = useState(false);

	const handleLogin = async () => {
		await signIn('google', { callbackUrl: '/works' });
	};

	const handleLogout = async () => {
		await signOut({ callbackUrl: '/' });
	};

	const [prevStatus, setPrevStatus] = useState(status);

	useEffect(() => {
		// ログイン状態が前回と異なる時だけアラート
		if (prevStatus !== status) {
			if (status === 'authenticated') {
				setShowLoginAlert(true);
				const timer = setTimeout(() => {
					setShowLoginAlert(false);
				}, 5000);
				return () => clearTimeout(timer);
			} else {
				setShowLogoutAlert(true);
				const timer = setTimeout(() => {
					setShowLogoutAlert(false);
				}, 5000);
				return () => clearTimeout(timer);
			}
		}
	}, [status, prevStatus]);

	return (
		<div>
			<>
				{showLoginAlert && status === 'authenticated' && (
					<Alert severity="success" color="info" className="toast">
						ログインに成功しました
					</Alert>
				)}
				{showLogoutAlert && status !== 'authenticated' && (
					<Alert severity="success" color="info" className="toast">
						ログアウトに成功しました
					</Alert>
				)}
			</>
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
					{status !== 'authenticated' ? (
						<Tooltip title="下からログインしてください" placement="bottom">
							<IconButton aria-label="delete">
								<AppsIcon />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip title="問題集一覧" placement="bottom">
							<IconButton aria-label="delete">
								<AppsIcon />
							</IconButton>
						</Tooltip>
					)}
				</div>
				{status !== 'authenticated' ? (
					<Tooltip title="ログイン" placement="top">
						<IconButton aria-label="delete" onClick={handleLogin}>
							<LogoutIcon />
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
