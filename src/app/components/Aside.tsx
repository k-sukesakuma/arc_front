'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import Alert from '@mui/material/Alert';

import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Aside() {
	const [showAlert, setShowAlert] = useState(false);

	const handleLogin = async () => {
		await signIn('google', { callbackUrl: '/works' });
	};

	const handleLogout = async () => {
		await signOut({ callbackUrl: '/' });
	};

	const { data: session, status } = useSession();

	const [showLoginAlert, setShowLoginAlert] = useState(false);
	const [showLogoutAlert, setShowLogoutAlert] = useState(false);
	const [prevStatus, setPrevStatus] = useState('unauthenticated');
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedShowLoginAlert = localStorage.getItem('showLoginAlert');
			if (storedShowLoginAlert) {
				setShowLoginAlert(JSON.parse(storedShowLoginAlert));
			}

			const storedShowLogoutAlert = localStorage.getItem('showLogoutAlert');
			if (storedShowLogoutAlert) {
				setShowLogoutAlert(JSON.parse(storedShowLogoutAlert));
			}

			const storedStatus = localStorage.getItem('status');
			if (storedStatus) {
				setPrevStatus(storedStatus);
			}
		}
	}, []);
	const pathname = usePathname();

	useEffect(() => {
		if (prevStatus !== undefined && prevStatus !== status) {
			if (status === 'authenticated' && pathname === '/works') {
				setShowLoginAlert(true);
				const timer = setTimeout(() => {
					setShowLoginAlert(false);
				}, 5000);
				return () => clearTimeout(timer);
			} else if (status !== 'authenticated' && pathname === '/') {
				setShowLogoutAlert(true);
				const timer = setTimeout(() => {
					setShowLogoutAlert(false);
				}, 5000);
				return () => clearTimeout(timer);
			}
		}
		setPrevStatus(status); // ステータスの更新
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
						<Image
							src="/logo.png"
							alt="Logspot"
							width={40} // あなたが必要とする幅（ピクセル単位）
							height={40} // あなたが必要とする高さ（ピクセル単位）
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
