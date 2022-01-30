import { Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { loginUser } from 'state/Authentication/actions';
import { useAuth } from 'state/Authentication/useAuthContext';

import { useLoginStyles } from './styles';

interface FormType {
	username: string;
	password: string;
}

export const Login: React.FunctionComponent = (): JSX.Element => {
	const { push } = useHistory();
	const { formatMessage } = useIntl();

	const [form, setForm] = useState<FormType>({
		username: '',
		password: '',
	});
	const { dispatch, state } = useAuth();
	const { error, loading } = state;

	const classes = useLoginStyles();

	const submitLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
		e.preventDefault();
		const response = await loginUser(dispatch, form);

		response && push('/');
	};

	const handleInputs = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name as keyof FormType]: e.target.value,
		}));
	};

	return (
		<Container maxWidth="sm" className={classes.wrapper}>
			<Grid container spacing={3} className={classes.formContainer}>
				<Grid item xs={8}>
					<Typography variant="h5">
						<FormattedMessage id="login__title" />
					</Typography>
				</Grid>
				<Grid item xs={8}>
					<TextField
						id="username-input"
						name="username"
						label={formatMessage({ id: 'common__username' })}
						variant="outlined"
						onChange={(e) => handleInputs(e)}
					/>
				</Grid>
				<Grid item xs={8}>
					<TextField
						id="password-input"
						name="password"
						type="password"
						label={formatMessage({ id: 'login__password' })}
						variant="outlined"
						onChange={(e) => handleInputs(e)}
					/>
				</Grid>
				<Grid item xs={8}>
					{(error as Record<string, unknown>).status === 401 && (
						<Typography variant="subtitle2" className={classes.error}>
							<FormattedMessage id="login__401" />
						</Typography>
					)}
				</Grid>
				<Grid item xs={8} className={classes.submitWrapper}>
					<Button disabled={loading} variant="contained" color="primary" onClick={submitLogin}>
						{loading ? <CircularProgress size={22} /> : <FormattedMessage id="login__submit" />}
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};
