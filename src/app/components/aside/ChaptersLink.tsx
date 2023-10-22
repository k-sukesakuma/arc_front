import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Fade from '@mui/material/Fade';
import Link from 'next/link';

export default function ChaptersLink() {
	const { data: session, status } = useSession();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
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
				<Tooltip title="チャプター" placement="right">
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
				<MenuItem onClick={handleClose}>
					<Link href="/works/advanced">上級編</Link>
				</MenuItem>
			</Menu>
		</div>
	);
}
