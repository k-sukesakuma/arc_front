'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArticleIcon from '@mui/icons-material/Article';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	height: 480,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function SearchMethod() {
	const { data: session, status } = useSession();

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const options = methods.map((option) => {
		const firstLetter = option.title[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		};
	});

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
						<ManageSearchIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="メソッド検索" placement="right">
					<IconButton onClick={handleOpen}>
						<ManageSearchIcon />
					</IconButton>
				</Tooltip>
			)}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						...style,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						align="center"
					>
						メソッドを調べる🔎
					</Typography>
					<Typography
						id="modal-modal-description"
						sx={{ mt: 2 }}
						align="center"
					>
						<div className="flex">
							<Autocomplete
								id="grouped-demo"
								options={options.sort(
									(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
								)}
								groupBy={(option) => option.firstLetter}
								getOptionLabel={(option) => option.title}
								sx={{ width: 550 }}
								renderInput={(params) => (
									<TextField {...params} label="メソッド名を検索してください" />
								)}
								onChange={(event, value) => {
									if (value != null) {
										window.open(value.url);
									}
								}}
							/>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}

const methods = [
	{ title: 'find', url: 'https://railsdoc.com/model#find' },
	{ title: 'find_by', url: 'https://railsdoc.com/model#find_by' },
	{ title: 'first', url: 'https://railsdoc.com/model#model_first' },
	{ title: 'last', url: 'https://railsdoc.com/model#last' },
	{ title: 'maximum', url: 'https://railsdoc.com/model#maximum' },
	{ title: 'minimum', url: 'https://railsdoc.com/model#minimum' },
	{ title: 'where', url: 'https://railsdoc.com/model#model_where' },
	{ title: 'order', url: 'https://railsdoc.com/model#model_order' },
	{ title: 'pluck', url: 'https://railsdoc.com/model#model_pluck' },
	{ title: 'ids', url: 'https://railsdoc.com/model#ids' },
	{ title: 'take', url: 'https://railsdoc.com/model#take' },
	{ title: 'find_each', url: 'https://railsdoc.com/model#find_each' },
	{ title: 'joins', url: 'https://railsdoc.com/model#joins' },
	{ title: 'includes', url: 'https://railsdoc.com/model#includes' },
	{ title: 'all', url: 'https://railsdoc.com/model#model_all' },
];
