import { UserDTO } from 'api/User';

import { ActionType, AuthInitialState, AuthActions } from './types';

export const authReducer = (state: AuthInitialState, action: AuthActions): AuthInitialState => {
	switch (action.type) {
		case ActionType.LOGIN_REQUEST:
			return {
				...state,
				error: {},
				loading: true,
			};
		case ActionType.LOGIN_SUCCESS:
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			localStorage.setItem('access_token', JSON.stringify(action.payload.token));

			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload.user,
				token: action.payload.token,
				error: {},
			};
		case ActionType.LOGIN_ERROR:
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				error: action.payload.error,
			};
		case ActionType.LOGOUT:
			localStorage.clear();

			return {
				...state,
				isAuthenticated: false,
				user: null,
				error: {},
			};
		case ActionType.CHECK_LOGGED_IN: {
			const localStorageUser: UserDTO = JSON.parse(localStorage.getItem('user') || '{}');
			const localStorageAccessToken: string = localStorage.getItem('access_token') || '';

			if (!Object.keys(localStorageUser) || !localStorageAccessToken) {
				return {
					...state,
					isAuthenticated: false,
					user: null,
					error: {},
				};
			}

			return {
				...state,
				isAuthenticated: true,
				user: localStorageUser,
				token: localStorageAccessToken,
			};
		}
		default:
			throw new Error(`Unhandled action type: ${action}`);
	}
};
