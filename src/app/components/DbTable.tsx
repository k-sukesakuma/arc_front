import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Column {
	id: 'id' | 'name' | 'email' | 'password';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
	{ id: 'id', label: 'ID', minWidth: 50 },
	{ id: 'name', label: 'Name', minWidth: 100 },
	{ id: 'email', label: 'Email', minWidth: 100 },
	{ id: 'password', label: 'Password', minWidth: 100 },
];

interface Data {
	id: number;
	name: string;
	email: string;
	password: string;
}

function createData(
	id: number,
	name: string,
	email: string,
	password: string
): Data {
	return { id, name, email, password };
}

const rows = [
	createData(1, 'John', 'john@example.com', 'xxxxxxxxxx'),
	createData(2, 'Emily', 'emily@example.com', 'xxxxxxxxxx'),
	createData(3, 'Steve', 'steve@example.com', 'xxxxxxxxxx'),
	createData(4, 'Michael', 'michael@example.com', 'xxxxxxxxxx'),
	createData(5, 'Anderson', 'anderson@example.com', 'xxxxxxxxxx'),
	createData(6, 'George', 'george@example.com', 'xxxxxxxxxx'),
	createData(7, 'Lily', 'lily@example.com', 'xxxxxxxxxx'),
	createData(8, 'Dudley', 'dudley@example.com', 'xxxxxxxxxx'),
	createData(9, 'Luna', 'luna@example.com', 'xxxxxxxxxx'),
	createData(10, 'Bill', 'bill@example.com', 'xxxxxxxxxx'),
];

export default function StickyHeadTable({ user_id }: { user_id: number }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ height: 430 }}>
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
									<TableRow
										hover
										role="checkbox"
										tabIndex={-1}
										key={row.id}
										style={{
											backgroundColor:
												row.id === user_id ? '#E6E6E6' : 'inherit',
										}}
									>
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
