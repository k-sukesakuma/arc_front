'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Aside from '@/app/components/aside/Aside';
import DbTable from '@/app/components/practices/DbTable';
import { Box, Grid, Tab } from '@mui/material';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import CodeEditor from '@/app/components/practices/CodeEditor';
import * as monaco from 'monaco-editor';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';
import useSWR from 'swr';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import TwitterIcon from '@mui/icons-material/Twitter';
import Description from '@/app/components/practices/Description';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface ExecutionDataType {
	id: number;
	name: string;
	email: string;
	password: string;
	title: string;
	content: string;
	comment: string;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
};

const Page = () => {
	const fetcher = (url: string) => axios.get(url).then((res) => res.data);

	const [executionData, setExecutionData] = useState<ExecutionDataType[]>([]);
	const [code, setCode] = useState('');
	const [answer, setAnswer] = useState('');
	const [modalContent, setModalContent] = useState(false);
	const [openAnswer, setOpenAnswer] = useState(false);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('1');
	const [leftValue, setLeftValue] = useState('1');
	const [copied, setCopied] = useState(false);

	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	const handleOpenAnswer = () => setOpenAnswer(true);
	const handleCloseAnswer = () => setOpenAnswer(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const params = useParams();
	const slug = params.slug;
	const id = params.id;

	const router = useRouter();

	const handleEditorDidMount = (
		editor: monaco.editor.IStandaloneCodeEditor | null
	) => {
		if (editor && editor.getModel()) {
			editorRef.current = editor;
			editor.onDidChangeModelContent((event) => {});
		}
	};

	const executeCode = () => {
		if (editorRef.current) {
			const code = editorRef.current.getValue({
				preserveBOM: false,
				lineEnding: '\n',
			});
			setCode(code);
		}
	};

	const resetCode = () => {
		if (editorRef.current) {
			editorRef.current.setValue('');
		}
	};

	const [message, setMessage] = useState('');
	const executeAnswer = () => {
		if (editorRef.current) {
			const code = editorRef.current.getValue({
				preserveBOM: false,
				lineEnding: '\n',
			});
			setAnswer(code);
		}
	};

	const getChapterName = (slug: string | string[]) => {
		const slugStr = Array.isArray(slug) ? slug[0] : slug;
		switch (slugStr) {
			case 'trial':
				return 'トライアル編';
			case 'basic':
				return '初級編';
			case 'intermediate':
				return '中級編';
			case 'advanced':
				return '上級編';
		}
	};

	const displayChapterName = getChapterName(slug as string);

	useEffect(() => {
		setCurrentQuestionIndex(Number(id) - 1);
	}, [id]);

	const { data: answerPracticesData, error: answerPracticesError } = useSWR(
		`https://current-user-back.onrender.com/api/v1/practices?slug=${slug}`,
		fetcher
	);

	const { data: executionsData, error: executionsError } = useSWR(
		code
			? `https://current-user-back.onrender.com/api/v1/executions?active_record_string=${encodeURIComponent(
					code
			  )}&user_id=${answerPracticesData[currentQuestionIndex].user_id}`
			: null,
		fetcher
	);

	const { data: sqlData, error: sqlError } = useSWR(
		code
			? `https://current-user-back.onrender.com/api/v1/executions/sql?active_record_string=${encodeURIComponent(
					code
			  )}&user_id=${answerPracticesData[currentQuestionIndex].user_id}`
			: null,
		fetcher
	);

	const { data: answersData, error: answersError } = useSWR(
		answer
			? `https://current-user-back.onrender.com/api/v1/executions/check?active_record_string=${encodeURIComponent(
					answer
			  )}&practice_id=${
					answerPracticesData[currentQuestionIndex].id
			  }&user_id=${answerPracticesData[currentQuestionIndex].user_id}`
			: null,
		fetcher
	);

	useEffect(() => {
		if (answersData) {
			setModalContent(answersData.result);

			setMessage(
				modalContent
					? 'おめでとうございます！次の問題にも挑戦してみましょう！'
					: '不正解です、、！！もう一度自分のコードに間違いがないか確認してみましょう。'
			);
		}
	}, [answersData, executionsError]);

	const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
		color: theme.palette.getContrastText(grey[50]),
		backgroundColor: 'white',
		'&:hover': {
			backgroundColor: '#E6E6E6',
		},
	}));

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};

	const leftHandleChange = (event: any, newValue: any) => {
		setLeftValue(newValue);
	};

	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow mx-10">
					<div className="shadow-md px-6 py-4 my-5 rounded-lg bg-white">
						<div className="text-xl font-bold text-gray-900 px-3 mb-2">
							{answerPracticesData &&
								answerPracticesData[currentQuestionIndex].title}
						</div>
						<hr className="mt-1 mb-2 rounded-lg" />
						<div>
							<div className="px-4 py-3 font-semibold rounded-lg">
								{answerPracticesData &&
									answerPracticesData[currentQuestionIndex].question}
							</div>
						</div>
					</div>
					{executionData.map((value, index) => (
						<li key={index} className="p-4">
							<button className="font-bold">{value.name}</button>
						</li>
					))}
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<div className="shadow-md rounded-lg bg-white">
								<TabContext value={leftValue}>
									<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
										<TabList
											onChange={leftHandleChange}
											aria-label="lab API tabs example"
										>
											<Tab label="エディタ" value="1" />
											<div className="mt-1.5 ml-5 ">
												<Tooltip title="実行する" placement="right-start">
													<IconButton aria-label="delete">
														<PlayCircleOutlineIcon
															onClick={(event) => {
																executeCode();
																setValue('3');
															}}
															style={{
																color: 'gray',
															}}
														/>
													</IconButton>
												</Tooltip>
												<Tooltip
													title="リセットする"
													placement="left-start"
													style={{ marginLeft: '425px' }}
												>
													<IconButton aria-label="delete">
														<RestartAltIcon
															onClick={(event) => {
																resetCode();
															}}
															style={{
																color: 'gray',
															}}
														/>
													</IconButton>
												</Tooltip>
											</div>
										</TabList>
									</Box>
									<TabPanel value="1" sx={{ height: 478 }}>
										<CodeEditor onMount={handleEditorDidMount} />
									</TabPanel>
								</TabContext>
							</div>
						</Grid>
						<Grid item xs={6}>
							<div className="shadow-md rounded-lg bg-white">
								<TabContext value={value}>
									<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
										<TabList
											onChange={handleChange}
											aria-label="lab API tabs example"
										>
											<Tab label="ユーザー一覧" value="1" />
											<Tab label="スキーマ" value="2" />
											<Tab label="リレーション" value="4" />
											<Tab label="変換SQL / 実行結果" value="3" />
											<Description />
										</TabList>
									</Box>
									<TabPanel value="1">
										<DbTable
											user_id={
												answerPracticesData &&
												answerPracticesData[currentQuestionIndex].user_id
											}
										/>
									</TabPanel>
									<TabPanel value="2" sx={{ height: 478 }}>
										<div
											className="text-white pt-8 pb-8 pl-3 pr-8 rounded-sm"
											style={{
												backgroundColor: '#1E1E1E',
												maxHeight: '440px',
												overflowY: 'auto',
												overflowX: 'auto',
											}}
										>
											<Image
												src="/db.png"
												alt="db"
												width={470}
												height={270}
												style={{
													margin: 'auto',
													display: 'block',
												}}
											/>
										</div>
									</TabPanel>
									<TabPanel value="4" sx={{ height: 478 }}>
										<div
											className="text-white pt-8 pb-8 pl-3 pr-8 rounded-sm"
											style={{
												backgroundColor: '#1E1E1E',
												height: '440px',
												overflowY: 'auto',
												overflowX: 'auto',
											}}
										>
											<Image
												src="/relation.png"
												alt="relation"
												width={1000}
												height={1000}
												style={{
													margin: 'auto',
													display: 'block',
												}}
											/>
										</div>
									</TabPanel>
									<TabPanel value="3">
										{sqlData && (
											<div
												className="text-white pt-8 pb-8 pl-3 pr-8 rounded-sm mb-2"
												style={{
													backgroundColor: '#1E1E1E',
													height: '100px',
													width: '580px',
													overflowY: 'auto',
													overflowX: 'auto',
													whiteSpace: 'nowrap',
													color: '#6099c8',
												}}
												dangerouslySetInnerHTML={{
													__html: sqlData
														? sqlData.sql.replace(/;/g, ';<br />')
														: '',
												}}
											/>
										)}

										{executionsData &&
										typeof executionsData === 'object' &&
										'result' in executionsData ? (
											<div className="height">{executionsData.result}</div>
										) : (
											<Paper sx={{ width: '100%' }}>
												<TableContainer sx={{ height: 323, width: '100%' }}>
													<Table
														component="table"
														stickyHeader
														aria-label="sticky table"
														sx={{
															maxHeight: 323,
															tableLayout: 'auto',
														}}
													>
														<TableHead>
															{executionsData &&
																((Array.isArray(executionsData) &&
																	executionsData.length > 0) ||
																	(typeof executionsData === 'object' &&
																		Object.keys(executionsData).length > 0)) &&
																Object.keys(
																	Array.isArray(executionsData)
																		? executionsData[0]
																		: executionsData
																).map((key) => {
																	if (
																		Array.isArray(executionsData) &&
																		executionsData.every(
																			(item) => typeof item === 'string'
																		)
																	) {
																		return null;
																	}
																	return (
																		<TableCell
																			key={key}
																			style={{
																				width: '200px',
																			}}
																		>
																			{key}
																		</TableCell>
																	);
																})}
														</TableHead>
														<TableBody>
															{(Array.isArray(executionsData)
																? executionsData
																: [executionsData]
															)
																.slice(
																	page * rowsPerPage,
																	page * rowsPerPage + rowsPerPage
																)
																.map((row) => {
																	if (
																		row &&
																		typeof row === 'object' &&
																		!Array.isArray(row)
																	) {
																		return (
																			<TableRow
																				hover
																				role="checkbox"
																				tabIndex={-1}
																				key={row.name}
																			>
																				{Object.keys(row).map((key) => {
																					const value = row[key];
																					return (
																						<TableCell
																							key={key}
																							style={{
																								width: '200px',
																							}}
																						>
																							{value}
																						</TableCell>
																					);
																				})}
																			</TableRow>
																		);
																	} else if (
																		typeof row === 'string' ||
																		typeof row === 'number'
																	) {
																		return (
																			<TableRow key={1}>
																				<TableCell
																					key={1}
																					style={{
																						width: '200px',
																					}}
																				>
																					{row}
																				</TableCell>
																			</TableRow>
																		);
																	}
																})}
														</TableBody>
													</Table>
												</TableContainer>
											</Paper>
										)}
									</TabPanel>
								</TabContext>
							</div>
						</Grid>
						<Grid item xs={1.5}>
							<ColorButton
								variant="contained"
								startIcon={<TaskAltIcon />}
								onClick={(event) => {
									executeAnswer();
									handleOpen();
								}}
								style={{ backgroundColor: 'white' }}
							>
								答え合わせ
							</ColorButton>
						</Grid>
						<Grid item xs={1.5}>
							<ColorButton
								variant="contained"
								startIcon={<ManageSearchIcon />}
								onClick={handleOpenAnswer}
								style={{ backgroundColor: 'white' }}
							>
								正解を見る
							</ColorButton>
						</Grid>
					</Grid>
				</section>
			</main>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h1"
						className="font-semibold"
					>
						{modalContent ? '正解👍' : '不正解🏃‍♂️'}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 1 }}>
						{modalContent
							? 'おめでとうございます！次の問題にも挑戦してみましょう！'
							: '不正解です、、！！もう一度自分のコードに間違いがないか確認してみましょう。'}
						{modalContent && (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Button
									onClick={() => {
										const chapterName = displayChapterName;
										const practiceTitle =
											answerPracticesData[currentQuestionIndex].title;
										const tweetText = `【${chapterName}】${practiceTitle}をクリアしたよ！`;
										const url = window.location.origin;
										window.open(
											`https://twitter.com/intent/tweet?text=${tweetText}%0A%0A${url}`,
											'_blank'
										);
									}}
								>
									<TwitterIcon />
								</Button>

								<Button
									onClick={() => {
										if (currentQuestionIndex < answerPracticesData.length - 1) {
											let nextIndex = currentQuestionIndex + 1;
											setCurrentQuestionIndex(nextIndex);
											handleClose();
											router.push(`/works/${slug}/${nextIndex + 1}`);
										} else {
											handleClose();
											router.push('/works');
										}
									}}
								>
									次の問題へ
								</Button>
							</div>
						)}
					</Typography>
				</Box>
			</Modal>
			<Modal
				open={openAnswer}
				onClose={handleCloseAnswer}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Typography
							id="modal-modal-title"
							variant="h6"
							component="h2"
							className="font-semibold"
						>
							答え😎
						</Typography>
						<CopyToClipboard
							text={
								answerPracticesData &&
								answerPracticesData[Number(id) - 1].answer
							}
							onCopy={() => setCopied(true)}
						>
							<button>
								<Tooltip
									title={copied ? 'コピー済' : 'コピーする'}
									placement="left-start"
								>
									<ContentCopyIcon
										style={{
											color: '#1E1E1E',
										}}
									/>
								</Tooltip>
							</button>
						</CopyToClipboard>
					</div>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<div
							className="text-white pt-8 pb-8 pl-3 pr-8 rounded-sm"
							style={{
								backgroundColor: '#1E1E1E',
								maxHeight: '200px',
								overflowY: 'auto',
								overflowX: 'auto',
								whiteSpace: 'nowrap',
							}}
						>
							<p
								className="mt-2 text-xl text-slate-200"
								style={{ color: '#6099c8' }}
							>
								{answerPracticesData &&
									answerPracticesData[Number(id) - 1].answer}
							</p>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default Page;
