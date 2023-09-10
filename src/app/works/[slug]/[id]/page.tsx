'use client';
import React, { useState } from 'react';
import Aside from '@/app/components/Aside';
import CodeEditor from '@/app/components/CodeEditor';
import ChaptersHeader from '@/app/components/ChaptersHeader';
import { Providers } from '@/app/providers';
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Flex,
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

const page = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div>
			<main className="flex bg-slate-100 relative">
				<Aside />
				<section className="flex-grow">
					<div className="shadow-md px-6 py-4 my-5 mx-10 rounded-lg bg-white">
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
					<Providers>
						<Flex justifyContent="space-around" className="mx-5">
							<Box
								className="bg-white rounded shadow-md"
								height="520px"
								width="622px"
							>
								<Tabs>
									<TabList
										style={{ display: 'flex', justifyContent: 'space-between' }}
									>
										<Tab className="font-bold">エディタ</Tab>
										<a href="#" onClick={() => setTabIndex(2)}>
											<RepeatIcon
												className="mt-2 mr-5"
												w={25}
												h={25}
												style={{ color: '#808080' }}
											/>
										</a>
									</TabList>
									<TabPanels>
										<TabPanel>
											<CodeEditor />
										</TabPanel>
										<TabPanel>
											<p className="font-bold">実行</p>
										</TabPanel>
									</TabPanels>
								</Tabs>
							</Box>

							<Box
								className="bg-white rounded shadow-md"
								height="520px"
								width="622px"
							>
								<Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
									<TabList>
										<Tab className="font-bold">DB</Tab>
										<Tab className="font-bold">ER図</Tab>
										<Tab className="font-bold">実行結果</Tab>
									</TabList>
									<TabPanels>
										<TabPanel>
											<p>DB</p>
										</TabPanel>
										<TabPanel>
											<p>ER図</p>
										</TabPanel>
										<TabPanel>
											<TableContainer
												overflowX="scroll"
												overflowY="scroll"
												maxHeight="430px"
											>
												<Table variant="simple">
													<Thead>
														<Tr>
															<Th>id</Th>
															<Th>name</Th>
															<Th>email</Th>
															<Th>password</Th>
														</Tr>
													</Thead>
													<Tbody>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
														<Tr>
															<Td>1</Td>
															<Td>suzuki taro</Td>
															<Td>sample@sample.com</Td>
															<Td>xxxxxxxxxxxxx</Td>
														</Tr>
													</Tbody>
												</Table>
											</TableContainer>
										</TabPanel>
									</TabPanels>
								</Tabs>
							</Box>
						</Flex>
						<div className="fixed bottom-8 flex mx-10">
							<Button
								onClick={onOpen}
								className="font-semibold shadow-md px-5 py-4 rounded-lg mt-3 bg-white hover:bg-slate-400 hover:text-white"
							>
								答え合わせ
							</Button>
							<Button
								onClick={onOpen}
								className="font-semibold shadow-md px-5 py-4 rounded-lg ml-3 mt-3 bg-white hover:bg-slate-400 hover:text-white"
							>
								正解を見る
							</Button>
						</div>

						<Modal isOpen={isOpen} onClose={onClose}>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>正解</ModalHeader>
								<ModalCloseButton />
								<ModalBody>
									<img
										loading="lazy"
										src="/logo.png"
										alt="Logspot"
										className=""
									/>
								</ModalBody>

								<ModalFooter>
									<Button colorScheme="blue" mr={3} onClick={onClose}>
										Close
									</Button>
									<Button variant="ghost">Secondary Action</Button>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</Providers>
				</section>
			</main>
		</div>
	);
};

export default page;
