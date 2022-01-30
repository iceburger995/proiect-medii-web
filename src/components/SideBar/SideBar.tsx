import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, ListItem, ListItemText, useScrollTrigger } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import classnames from 'classnames';
import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useSidebarStyles } from './styles';
import { WrappedNavLink } from './WrappedNavLink';

export interface NavItem {
	id: string;
	title: JSX.Element;
	url?: string;
	items?: NavItem[];
	isOpen?: boolean;
}

export const NAVIGATION_SECTIONS: NavItem[] = [
	{
		id: 'home',
		url: '/',
		title: <FormattedMessage id="home__title" />,
	},
	{
		id: 'users',
		url: '/users',
		title: <FormattedMessage id="users__title" />,
	},
];

interface SidebarProps {
	open: boolean;
	onToggleCollapse: () => void;
}

export const SideBar: React.FC<SidebarProps> = ({ open, onToggleCollapse }) => {
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const classes = useSidebarStyles();

	const sidebarScrollTrigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 115,
		target: sidebarRef.current || undefined,
	});

	const { formatMessage } = useIntl();

	const toggleDrawer = (): void => {
		onToggleCollapse();
	};

	return (
		<div className={classes.root}>
			<Drawer
				variant="permanent"
				className={classnames(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: classnames(classes.drawerContent, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<AppBar
					className={classes.actions}
					position="sticky"
					elevation={sidebarScrollTrigger ? 4 : 0}
					aria-label={formatMessage({ id: 'label__sidebar_header' })}
				>
					<IconButton
						aria-label={formatMessage({ id: 'label__sidebar_toggle' })}
						onClick={toggleDrawer}
						className={classes.drawerToggleButton}
					>
						<MenuIcon color="inherit" />
					</IconButton>
				</AppBar>
				<div className={classes.content} ref={sidebarRef}>
					{NAVIGATION_SECTIONS.map(({ id, title, url }) => {
						const getPath = (url: string | undefined, id: string): string => url || `/${id}`;

						return (
							<ListItem
								key={id}
								button
								to={getPath(url, id)}
								exact={true}
								component={WrappedNavLink as React.ElementType}
							>
								<ListItemText primary={title} disableTypography />
							</ListItem>
						);
					})}
				</div>
			</Drawer>
		</div>
	);
};
