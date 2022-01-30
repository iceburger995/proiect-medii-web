import { AppBar, Grid, Toolbar } from '@mui/material';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';

import Logo from 'assets/logo.png';
import { useAuth } from 'state/Authentication/useAuthContext';
import { useLanguage } from 'state/Language/useLanguage';

import { useTopMenuStyles } from './styles';

export const TopMenu: React.FunctionComponent = () => {
	const topMenuRef = useRef<HTMLDivElement>();
	const classes = useTopMenuStyles();
	const { formatMessage } = useIntl();

	const { changeLanguage } = useLanguage();

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
				</Grid>
			</Toolbar>
		</AppBar>
	);
};
