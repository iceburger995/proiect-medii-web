import { Button, Container, Grid, InputLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';

import { createUser, getUser, RegisterUserDTO, updateUser, UserDTO } from 'api/User';
import { Loading } from 'components';

import { useUserStyles } from './styles';

const EMPTY_USER: Partial<RegisterUserDTO & { confirmPassword: string }> = {
	username: '',
	password: '',
	firstName: '',
	lastName: '',
};

export const User: React.FunctionComponent = (): JSX.Element => {
	const [user, setUser] = useState<Partial<RegisterUserDTO>>(EMPTY_USER);
	const { id } = useParams<{ id: string }>();
	const { push } = useHistory();
	const { formatMessage } = useIntl();

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<RegisterUserDTO>();
	const onSubmit = handleSubmit(async (data) => {
		if (id === 'new') {
			try {
				const registeredUser = await createUser(data as RegisterUserDTO);

				push('/users');
			} catch (error) {
				console.error(error);
			}

			return;
		}
		try {
			await updateUser(data as UserDTO);
			push('/users');
		} catch (error) {
			console.error(error);
		}
	});

	const classes = useUserStyles();

	useEffect(() => {
		if (id !== 'new') {
			const fetchUser = async (): Promise<void> => {
				try {
					const response = await getUser(id);

					reset(response);
					// setUser(response);
				} catch (e: any) {
					if (e.status === 401) {
						push('/login');
					}
					console.error(e);
				}
			};

			fetchUser();
		}
	}, []);

	const submitEdit = async (): Promise<void> => {
		try {
			await updateUser(user as UserDTO);
			push('/users');
		} catch (error) {
			console.error(error);
		}
	};

	const registerUser = async (): Promise<void> => {
		try {
			const registeredUser = await createUser(user as RegisterUserDTO);

			console.log(registeredUser);
		} catch (error) {
			console.error(error);
		}
	};

	if (!Object.keys(user)) return <Loading />;

	return (
		<Container maxWidth="sm" className={classes.wrapper}>
			<Grid container spacing={3} className={classes.formContainer}>
				<form onSubmit={onSubmit}>
					<Grid item xs={8}>
						<Typography variant="h5">User</Typography>
					</Grid>
					<Grid item xs={8}>
						<InputLabel>Username</InputLabel>
						<TextField
							id="username-input"
							variant="outlined"
							{...register('username', { required: 'This is required' })}
							helperText={errors?.username?.message}
							FormHelperTextProps={{
								error: true,
							}}
						/>
					</Grid>
					<Grid item xs={8}>
						<InputLabel>First Name</InputLabel>
						<TextField
							id="firstName-input"
							variant="outlined"
							{...register('firstName', { required: 'This is required' })}
							helperText={errors?.firstName?.message}
							FormHelperTextProps={{
								error: true,
							}}
						/>
					</Grid>
					<Grid item xs={8}>
						<InputLabel>Last Name</InputLabel>
						<TextField
							id="lastName-input"
							variant="outlined"
							{...register('lastName', { required: 'This is required' })}
							helperText={errors?.lastName?.message}
							FormHelperTextProps={{
								error: true,
							}}
						/>
					</Grid>
					{id === 'new' && (
						<>
							<Grid item xs={8}>
								<InputLabel>Password</InputLabel>
								<TextField
									id="password-input"
									type="password"
									helperText={errors?.password?.message}
									variant="outlined"
									{...register('password', { required: 'This is required' })}
									FormHelperTextProps={{
										error: true,
									}}
								/>
							</Grid>
						</>
					)}
					<Grid item xs={8} className={classes.submitWrapper}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							// onClick={id === 'new' ? registerUser : submitEdit}
						>
							<FormattedMessage id="common__save" />
						</Button>
					</Grid>
				</form>
			</Grid>
		</Container>
	);
};
