import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Column {
	id: 'name' | 'email' | 'password';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: string) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'name', minWidth: 100 },
	{ id: 'email', label: 'email', minWidth: 100 },
	{ id: 'password', label: 'password', minWidth: 100 },
];

interface Data {
	name: string;
	email: string;
	password: string;
}

function createData(name: string, email: string, password: string): Data {
	return { name, email, password };
}

const rows = [
	createData('John', 'john@example.com', 'xxxxxxxxxx'),
	createData('Emily', 'emily@example.com', 'xxxxxxxxxx'),
	createData('Steve', 'steve@example.com', 'xxxxxxxxxx'),
	createData('Michael', 'michael@example.com', 'xxxxxxxxxx'),
	createData('Anderson', 'anderson@example.com', 'xxxxxxxxxx'),
	createData('George', 'george@example.com', 'xxxxxxxxxx'),
	createData('Lily', 'lily@example.com', 'xxxxxxxxxx'),
	createData('Dudley', 'dudley@example.com', 'xxxxxxxxxx'),
	createData('Luna', 'luna@example.com', 'xxxxxxxxxx'),
	createData('Bill', 'bill@example.com', 'xxxxxxxxxx'),
];

export default function StickyHeadTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ height: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody sx={{ width: '100%', overflow: 'hidden' }}>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format ? column.format(value) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
