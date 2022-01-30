import { Button, Container } from '@mui/material';
import { DataGrid, GridColDef, GridCellParams, GridRowParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getUsers, UserDTO } from 'api/User';
import { Loading } from 'components';

import { useUsersStyles } from './styles';

export const Users: React.FunctionComponent = (): JSX.Element => {
	const [users, setUsers] = useState<UserDTO[]>([]);
	const { push } = useHistory();
	const classes = useUsersStyles();

	const columns: GridColDef[] = [
		{
			field: '',
			headerName: 'Actions',
			width: 200,
			editable: false,
			sortable: false,
			renderCell: ({ row }: GridCellParams) => (
				<>
					<Button
						variant="outlined"
						color="error"
						onClick={(event) => {
							event.preventDefault();
							event.stopPropagation();

							console.log(`Deleted article ${row.id}`);
						}}
					>
						Delete
					</Button>
				</>
			),
		},
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{
			field: 'username',
			headerName: 'Username',
			sortable: false,
			width: 130,
		},
	];

	useEffect(() => {
		const fetchUsers = async (): Promise<void> => {
			try {
				const response = await getUsers();

				setUsers(response);
			} catch (e: any) {
				if (e.status === 401) {
					push('/login');
				}
				console.error(e);
			}
		};

		fetchUsers();
	}, []);

	const handleRowClick = ({ row }: GridRowParams): void => {
		console.log(row);
		push(`users/${row.id}`);
	};

	if (!users.length) return <Loading />;

	return (
		<Container className={classes.tableContainer}>
			<Button variant="outlined" onClick={() => push('/users/new')}>
				Add User
			</Button>
			<DataGrid
				onRowClick={handleRowClick}
				disableColumnMenu
				disableSelectionOnClick
				className={classes.table}
				rows={users}
				columns={columns}
			/>
		</Container>
	);
};
