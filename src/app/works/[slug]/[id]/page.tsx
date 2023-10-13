'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Aside from '@/app/components/Aside';
import DbTable from '@/app/components/DbTable';
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
import { blueGrey } from '@mui/material/colors';
import CodeEditor from '@/app/components/CodeEditor';
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

const apiUrl = process.env.NEXTAUTH_URL_INTERNAL;
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Column {
	id: 'name' | 'code' | 'population' | 'size' | 'density';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: Column[] = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
	{
		id: 'population',
		label: 'Population',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'size',
		label: 'Size\u00a0(km\u00b2)',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toLocaleString('en-US'),
	},
	{
		id: 'density',
		label: 'Density',
		minWidth: 170,
		align: 'right',
		format: (value: number) => value.toFixed(2),
	},
];

interface Data {
	name: string;
	code: string;
	population: number;
	size: number;
	density: number;
}

function createData(
	name: string,
	code: string,
	population: number,
	size: number
): Data {
	const density = population / size;
	return { name, code, population, size, density };
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface ExecutionDataType {
	id: number;
	name: string;
	email: string;
	password: string;
}

const Page = () => {
	const fetcher = (url: string) => axios.get(url).then((res) => res.data);

	const [executionData, setExecutionData] = useState<ExecutionDataType[]>([]);
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const [code, setCode] = useState('');

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

	// --------------------------答え合わせ--------------------------------------
	const [answer, setAnswer] = useState('');
	const [modalContent, setModalContent] = useState(false);

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

	const [open2, setOpen2] = useState(false);

	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => setOpen2(false);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const params = useParams();
	const slug = params.slug;
	const id = params.id;

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

	const router = useRouter();

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

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
		color: theme.palette.getContrastText(grey[50]),
		backgroundColor: grey[50],
		'&:hover': {
			backgroundColor: blueGrey[100],
		},
	}));
	const [value, setValue] = useState('1');

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};

	const [leftValue, setLeftValue] = useState('1');

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
										</TabList>
									</Box>
									<TabPanel value="1">
										<DbTable />
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
												maxHeight: '440px',
												overflowY: 'auto',
												overflowX: 'auto',
											}}
										>
											<Image
												src="/relation.png"
												alt="relation"
												width={495}
												height={450}
												style={{
													margin: 'auto',
													display: 'block',
												}}
											/>
										</div>
									</TabPanel>
									<TabPanel value="3">
										<div
											className="text-white pt-8 pb-8 pl-3 pr-8 rounded-sm mb-2"
											style={{
												backgroundColor: '#1E1E1E',
												height: '100px',
												overflowY: 'auto',
												overflowX: 'auto',
												whiteSpace: 'nowrap',
											}}
											dangerouslySetInnerHTML={{
												__html: sqlData
													? sqlData.sql.replace(/;/g, ';<br />')
													: '',
											}}
										/>

										{executionsData &&
										typeof executionsData === 'object' &&
										'result' in executionsData ? (
											<div className="height">{executionsData.result}</div>
										) : (
											<Paper sx={{ width: '100%' }}>
												<TableContainer sx={{ maxHeight: 323 }}>
													<Table
														stickyHeader
														aria-label="sticky table"
														sx={{ height: 323 }}
													>
														<TableHead>
															{executionsData &&
																(Array.isArray(executionsData)
																	? executionsData.length > 0
																	: Object.keys(executionsData).length > 0) &&
																Object.keys(
																	Array.isArray(executionsData)
																		? executionsData[0]
																		: executionsData
																).map((key) => (
																	<TableCell key={key}>{key}</TableCell>
																))}
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
																						<TableCell key={key}>
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
																			<TableRow
																				key={1}
																				hover
																				role="checkbox"
																				tabIndex={-1}
																			>
																				<TableCell>{row}</TableCell>
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
							>
								答え合わせ
							</ColorButton>
						</Grid>
						<Grid item xs={1.5}>
							<ColorButton
								variant="contained"
								startIcon={<ManageSearchIcon />}
								onClick={handleOpen2}
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
				open={open2}
				onClose={handleClose2}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						className="font-semibold"
					>
						答え😎
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<div
							className="text-white pt-8 pb-8 pl-3 pr-8 rounded-sm"
							style={{
								backgroundColor: '#1E1E1E',
								maxHeight: '200px',
								overflowY: 'auto',
								overflowX: 'auto',
							}}
						>
							<p className="mt-2 text-xl text-slate-200">
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
