import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Grid, Toolbar, Button } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';

import Logo from 'assets/logo.png';
import { logout } from 'state/Authentication/actions';
import { useAuth } from 'state/Authentication/useAuthContext';

import { useTopMenuStyles } from './styles';

export const TopMenu: React.FunctionComponent = () => {
	const classes = useTopMenuStyles();
	const { formatMessage } = useIntl();

	const { dispatch, state } = useAuth();

	return (
		<AppBar
			position="static"
			variant="elevation"
			color="secondary"
			className={classes.topMenu}
			aria-label={formatMessage({ id: 'label__topmenu_header' })}
		>
			<Toolbar className={classes.toolbar}>
				<Grid container spacing={2}>
					<Grid item xs={4}></Grid>
					<Grid item xs={4} className={classes.logoWrapper}>
						<img src={Logo} alt="Logo" />
					</Grid>
					<Grid item xs={4} className={classes.rightSide}>
						{state.isAuthenticated && (
							<Button onClick={() => logout(dispatch)}>
								<LogoutIcon />
							</Button>
						)}
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
