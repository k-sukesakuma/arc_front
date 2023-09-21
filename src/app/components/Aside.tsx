'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import toast from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AppsIcon from '@mui/icons-material/Apps';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { useSession, signIn, signOut } from 'next-auth/react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

export default function Aside() {
	const handleLogin = async () => {
		signIn('github', { callbackUrl: '/works' }),
			toast.loading('ログインを開始しています...');
	};

	const handleLogout = async () => {
		signOut({ callbackUrl: '/' }), toast.loading('ログアウトをしています...');
	};

	const { data: session, status } = useSession();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<aside className="border-r w-20 h-screen bg-slate-100 sticky top-0 flex flex-col items-center py-8 flex-shrink-0 justify-between">
				<div>
					<a href="/">
						<Image src="/logo.png" alt="Logspot" width={40} height={40} />
					</a>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{status !== 'authenticated' ? (
							<Tooltip title="下からログインしてください" placement="right">
								<IconButton aria-label="works">
									<AppsIcon />
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title="問題集" placement="right">
								<a href="/works">
									<IconButton aria-label="works">
										<AppsIcon />
									</IconButton>
								</a>
							</Tooltip>
						)}
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{status !== 'authenticated' ? (
							<Tooltip title="下からログインしてください" placement="right">
								<IconButton aria-label="chapter">
									<FormatListBulletedIcon />
								</IconButton>
							</Tooltip>
						) : (
							<Tooltip title="チャプター" placement="bottom">
								<IconButton
									aria-label="chapter"
									id="fade-button"
									aria-controls={open ? 'fade-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
								>
									<FormatListBulletedIcon />
								</IconButton>
							</Tooltip>
						)}
						<Menu
							id="fade-menu"
							MenuListProps={{
								'aria-labelledby': 'fade-button',
							}}
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							TransitionComponent={Fade}
						>
							<MenuItem onClick={handleClose}>
								<Link href="/works/trial">トライアル編</Link>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<Link href="/works/basic">初級編</Link>
							</MenuItem>{' '}
							<MenuItem onClick={handleClose}>
								<Link href="/works/intermediate">中級編</Link>
							</MenuItem>
						</Menu>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					></div>
				</div>

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
			</aside>
		</div>
	);
}
