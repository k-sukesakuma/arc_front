import React from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Image from 'next/image';
import DescriptionTable from './DescriptionTable';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 1000,
	height: 500, // ここで高さを指定
	bgcolor: '#f1f5f9',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
	overflow: 'auto',
};

export default function Description() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const markdownContent = '## コンテンツ';
	return (
		<div>
			<Tooltip title="ActiveRecordとは?" placement="right-start">
				<div className="mt-1.5 ml-1">
					<IconButton aria-label="delete">
						<QuestionAnswerIcon
							style={{
								color: 'gray',
							}}
							onClick={handleOpen}
						/>
					</IconButton>
				</div>
			</Tooltip>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<header>
						<div className="relative mx-auto max-w-[37.5rem] text-center pb-8">
							<div className="flex items-center justify-center">
								<h1 className="text-4xl font-semibold tracking-tight text-slate-700">
									ActiveRecordとは？
								</h1>
							</div>
						</div>
					</header>
					<div className="shadow-md px-6 py-4 mx-5 rounded-lg bg-white">
						<div>
							<div className="px-4 py-3 rounded-lg">
								<h2 className="text-2xl font-bold mt-2 mb-2">
									ActiveRecordとは?
								</h2>
								<hr className="mt-1 mb- rounded-lg" />
								<p className="mb-8">
									ActiveRecordとは、Ruby on
									Railsで用いられているRuby言語向けのO/Rマッピングの名称のことを指します。
									<br></br>
								</p>
								<h2 className="text-2xl font-bold mt-2 mb-2">
									O/Rマッピングとは?
								</h2>
								<hr className="mt-1 mb-2 rounded-lg" />
								<p className="mb-8">
									O/Rマッピング(Object-relational
									mapping)、通称ORMはデータベースとオブジェクト指向プログラミング言語の間の非互換なデータを変換するプログラミング技法です。
									少しこの説明だと難しいですね。
								</p>
								<h2 className="text-2xl font-bold mt-2 mb-2">SQLの翻訳機</h2>
								<hr className="mt-1 mb-2 rounded-lg" />
								<p className="mb-8">
									言い換えると
									<strong style={{ color: '#E06666' }}>
										【RubyコードとSQLの翻訳機】
									</strong>
									と考えるとわかりやすいかもしれません。
									<br></br>
									<Image
										src="/translate.png"
										alt="db"
										width={700}
										height={300}
										style={{
											margin: 'auto',
											display: 'block',
										}}
									/>
									<p className="mb-5">
										ActiveRecordの仕組みによって{' '}
										<strong style={{ color: '#E06666' }}>
											User.find_by(id: 2)
										</strong>
										というRubyコードが、
										<strong style={{ color: '#E06666' }}>
											SELECT * FROM users WHERE id = 2 LIMIT 1;
										</strong>
										というSQLに変換されて、データベースにデータを参照できるようになっています。
									</p>
									<DescriptionTable />
								</p>
								<h2 className="text-2xl font-bold mt-2 mb-2">まとめ</h2>
								<hr className="mt-1 mb- rounded-lg" />
								<p className="mb-5">
									ActiveRecordの仕組みと変換されるSQLを学習して、さらにスキルアップしましょう!
									<br></br>
								</p>
							</div>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
