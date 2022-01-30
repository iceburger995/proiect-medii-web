import { RouteProps } from 'components/RouterWrapper/RouterWrapper';
import { lazyImport } from 'helpers/lazyLoad';

export const LOGIN = '/login';
export const HOME = '/';
export const NOT_FOUND = '/not-found';
export const USERS = '/users';
export const USER = '/users/:id';

const { NotFound } = lazyImport(() => import('components/NotFound/NotFound'), 'NotFound');
const { Login } = lazyImport(() => import('components/Login/Login'), 'Login');
const { Home } = lazyImport(() => import('components/Home/Home'), 'Home');
const { Users } = lazyImport(() => import('components/Users/Users'), 'Users');
const { User } = lazyImport(() => import('components/Users/User/User'), 'User');

export const routes: Array<RouteProps> = [
	{
		path: HOME,
		exact: true,
		component: Home,
		isPrivate: true,
	},
	{
		path: LOGIN,
		exact: true,
		component: Login,
		isPrivate: false,
	},
	{
		path: NOT_FOUND,
		exact: true,
		component: NotFound,
		isPrivate: false,
	},
	{
		path: USERS,
		exact: true,
		component: Users,
		isPrivate: false,
	},
	{
		path: USER,
		exact: true,
		component: User,
		isPrivate: false,
	},
];
