import { Theme } from '@mui/material/styles/createTheme';
import { makeStyles } from '@mui/styles';

import { COLLAPSED_SIDEBAR_WIDTH } from 'components/SideBar/styles';

export const useUsersStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		height: '100%',
		display: 'flex !important',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	tableContainer: {
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(4),
		height: '90vh',
		paddingLeft: `calc(${theme.spacing(4)} + ${COLLAPSED_SIDEBAR_WIDTH}px) !important`,
	},
	table: {
		background: theme.palette.common.white,
	},
	error: {
		color: theme.palette.error.main,
	},
}));
