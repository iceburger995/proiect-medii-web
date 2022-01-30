import { Theme } from '@mui/material/styles/createTheme';
import { makeStyles } from '@mui/styles';

export const useUserStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		height: '100%',
		display: 'flex !important',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	formContainer: {
		display: 'flex',
		justifyContent: 'center',
		background: theme.palette.common.white,
		padding: theme.spacing(4),
	},
	submitWrapper: {
		display: 'flex',
		justifyContent: 'center',
		'& button': {
			width: '100%',
		},
	},
	error: {
		color: theme.palette.error.main,
	},
}));
