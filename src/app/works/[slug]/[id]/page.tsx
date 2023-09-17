'use client';
import React, { useState, useEffect, useRef } from 'react';
import Aside from '@/app/components/Aside';
import { Box, Grid, Tab } from '@mui/material';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SyncIcon from '@mui/icons-material/Sync';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { blueGrey } from '@mui/material/colors';
import CodeEditor from '@/app/components/CodeEditor';
import Editor from '@monaco-editor/react';
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

const rows = [
	createData('India', 'IN', 1324171354, 3287263),
	createData('China', 'CN', 1403500365, 9596961),
	createData('Italy', 'IT', 60483973, 301340),
	createData('United States', 'US', 327167434, 9833520),
	createData('Canada', 'CA', 37602103, 9984670),
	createData('Australia', 'AU', 25475400, 7692024),
	createData('Germany', 'DE', 83019200, 357578),
	createData('Ireland', 'IE', 4857000, 70273),
	createData('Mexico', 'MX', 126577691, 1972550),
	createData('Japan', 'JP', 126317000, 377973),
	createData('France', 'FR', 67022000, 640679),
	createData('United Kingdom', 'GB', 67545757, 242495),
	createData('Russia', 'RU', 146793744, 17098246),
	createData('Nigeria', 'NG', 200962417, 923768),
	createData('Brazil', 'BR', 210147125, 8515767),
];

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
	const {
		data: staticsData,
		error: staticsError,
		isLoading,
	} = useSWR('http://localhost:3001/api/v1/statics', fetcher);
	console.log(staticsData);

	const [executionData, setExecutionData] = useState<ExecutionDataType[]>([]);
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
	const [code, setCode] = useState('');

	const { data: executionsData, error: executionsError } = useSWR(
		code
			? `http://localhost:3001/api/v1/executions/execute?active_record_string=${encodeURIComponent(
					code
			  )}`
			: null,
		fetcher
	);

	useEffect(() => {
		if (executionsError) {
			console.log('エラー');
		}
		if (executionsData) {
			console.log(executionsData);
			console.log('データが取得できた');
		}
	}, [executionsData, executionsError]);
	const handleEditorDidMount = (
		editor: monaco.editor.IStandaloneCodeEditor | null
	) => {
		if (editor && editor.getModel()) {
			editorRef.current = editor;
			editor.onDidChangeModelContent((event) => {
				const previousLine = event.changes[0].range.startLineNumber - 1;
				const currentLine = event.changes[0].range.endLineNumber - 1;
			});
		}
	};

	const executeCode = () => {
		if (editorRef.current) {
			const code = editorRef.current.getValue({
				preserveBOM: false,
				lineEnding: '\n',
			});
			console.log(code);
			console.log(code.indexOf('\n') !== -1);
			setCode(code);
		}
	};

	// --------------------------答え合わせ--------------------------------------
	const [answer, setAnswer] = useState('');
	const [modalContent, setModalContent] = useState(false);
	const executeAnswer = () => {
		if (editorRef.current) {
			const code = editorRef.current.getValue({
				preserveBOM: false,
				lineEnding: '\n',
			});
			console.log(code);
			console.log(code.indexOf('\n') !== -1);
			setAnswer(code);
		}
	};

	const { data: answersData, error: answersError } = useSWR(
		answer
			? `http://localhost:3001/api/v1/answers/check?user_answer=${encodeURIComponent(
					answer
			  )}`
			: null,
		fetcher
	);

	useEffect(() => {
		if (executionsError) {
			console.log(executionsError);
			console.log('エラー');
		}
		if (answersData) {
			console.log(answersData);
			console.log('データが取得できた');
			setModalContent(answersData.result);
		}
	}, [answersData, answersError]);

	// ------------------------------------------------------------------------

	// --------------------------正解を見る--------------------------------------

	const [open2, setOpen2] = useState(false);

	const handleOpen2 = () => setOpen2(true);
	const handleClose2 = () => setOpen2(false);

	// ------------------------------------------------------------------------

	// ------------------------------次の問題に遷移------------------------------

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	const params = useParams();
	const slug = params.slug;
	const id = params.id;

	console.log(params);
	console.log(id);
	console.log(slug);

	useEffect(() => {
		setCurrentQuestionIndex(Number(id) - 1);
	}, [id]);

	const router = useRouter();

	const { data: answerPracticesData, error: answerPracticesError } = useSWR(
		`http://localhost:3001/api/v1/practices?slug=${slug}`,
		fetcher
	);

	useEffect(() => {
		if (answerPracticesError) {
			console.log(answerPracticesError);
			console.log('エラー');
		}
		if (answerPracticesData) {
			console.log('問題');
			console.log('answerPracticesData');
			console.log(answerPracticesData);
			console.log('データが取得できた');
		}
	}, [answerPracticesData, answerPracticesError]);

	// ------------------------------------------------------------------------

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

	const [isFocused, setIsFocused] = useState(false);
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
					{executionData.map((value) => (
						<li className="p-4">
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
														<SyncIcon
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
									<TabPanel value="1">
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
											<Tab label="DB" value="1" />
											<Tab label="ER図" value="2" />
											<Tab label="実行結果" value="3" />
										</TabList>
									</Box>
									<TabPanel value="1">Item One</TabPanel>
									<TabPanel value="2">Item Two</TabPanel>
									<TabPanel value="3">
										{executionsData && 'result' in executionsData ? (
											<div className="height">{executionsData.result}</div>
										) : (
											<Paper sx={{ width: '100%' }}>
												<TableContainer sx={{ height: 440 }}>
													<Table stickyHeader aria-label="sticky table">
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
																	if (row && typeof row === 'object') {
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
					<Typography id="modal-modal-title" variant="h6" component="h2">
						{modalContent ? '正解' : '不正解'}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{modalContent
							? 'おめでとうございます！次の問題に挑戦してみましょう！'
							: '不正解です、、！！もう一度自分のコードに間違いがないか確認してみましょう。'}
						<Button
							onClick={() => {
								if (currentQuestionIndex < answerPracticesData.length - 1) {
									let nextIndex = currentQuestionIndex + 1;
									setCurrentQuestionIndex(nextIndex);
									handleClose();
									router.push(
										`http://localhost:3000/works/${slug}/${nextIndex}`
									);
								} else {
									handleClose();
									router.push('http://localhost:3000/works');
								}
							}}
						>
							次の問題へ
						</Button>
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
						答え
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<div className="bg-slate-700 text-white pt-8 pb-8 pl-3 pr-8  rounded-md">
							<p className="mt-2 text-xl text-slate-200">
								{answerPracticesData &&
									typeof id === 'string' &&
									answerPracticesData[id].answer}
							</p>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default Page;
