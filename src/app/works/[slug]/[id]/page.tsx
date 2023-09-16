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
			console.log('エラー');
		}
		if (answersData) {
			console.log(answersData);
			console.log('データが取得できた');
		}
	}, [answersData, answersError]);

	// --------------------------答え合わせ--------------------------------------

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

	const [open, setOpen] = React.useState(false);
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
							allメソッドによるデータの取得
						</div>
						<hr className="mt-1 mb-2 rounded-lg" />
						<div>
							<div className="px-4 py-3 font-semibold rounded-lg">
								allメソッドを使用して、usersテーブルのレコードを全て取得してください。
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
										{' '}
										<Paper sx={{ width: '100%' }}>
											<TableContainer sx={{ maxHeight: 440 }}>
												<Table stickyHeader aria-label="sticky table">
													<TableHead>
														{columns.map((column) => (
															<TableCell
																key={column.id}
																align={column.align}
																style={{ minWidth: column.minWidth }}
															>
																{column.label}
															</TableCell>
														))}
													</TableHead>
													<TableBody>
														{executionsData &&
															executionsData
																.slice(
																	page * rowsPerPage,
																	page * rowsPerPage + rowsPerPage
																)
																.map(
																	(row: {
																		email: string;
																		name: string;
																		password: string;
																	}) => {
																		return (
																			<TableRow
																				hover
																				role="checkbox"
																				tabIndex={-1}
																				key={row.name}
																			>
																				{Object.keys(row).map((key) => {
																					const value = (row as any)[key];
																					return (
																						<TableCell key={key}>
																							{value}
																						</TableCell>
																					);
																				})}
																			</TableRow>
																		);
																	}
																)}
													</TableBody>
												</Table>
											</TableContainer>
										</Paper>
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
								onClick={handleOpen}
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
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default Page;
