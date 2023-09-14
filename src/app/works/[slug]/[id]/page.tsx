'use client';
import React, { useState } from 'react';
import Aside from '@/app/components/Aside';
import { Box, Grid, Tab } from '@mui/material';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SyncIcon from '@mui/icons-material/Sync';
import CodeEditor from '@/app/components/CodeEditor';

const Page = () => {
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
															onClick={(handleChange) => setValue('3')}
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
										<CodeEditor />
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
									<TabPanel value="3">Item Three</TabPanel>
								</TabContext>
							</div>
						</Grid>
						<Grid item xs={1.5}>
							<div className="shadow-md rounded-lg bg-white">アイウエオ</div>
						</Grid>
						<Grid item xs={1.5}>
							<div className="shadow-md rounded-lg bg-white">アイウエオ</div>
						</Grid>
					</Grid>
				</section>
			</main>
		</div>
	);
};

export default Page;
