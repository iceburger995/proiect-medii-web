import { Dispatch } from 'react';

import { UserDTO } from 'api/User';
import { ActionMap } from 'state/types/ActionMap';

export interface AuthInitialState {
	user: UserDTO | null;
	token: string;
	isAuthenticated?: boolean;
	loading: boolean;
	error?: unknown;
}

export enum ActionType {
	LOGIN_REQUEST = 'LOGIN_REQUEST',
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGIN_ERROR = 'LOGIN_ERROR',
	LOGOUT = 'LOGOUT',
	CHECK_LOGGED_IN = 'CHECK_LOGGED_IN',
}

export type AuthPayload = {
	[ActionType.LOGIN_REQUEST]: {
		loading: boolean;
	};
	[ActionType.LOGIN_SUCCESS]: {
		token: string;
		user: UserDTO;
	};
	[ActionType.LOGIN_ERROR]: {
		error: string;
	};
	[ActionType.LOGOUT]: undefined;
	[ActionType.CHECK_LOGGED_IN]: undefined;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export interface AuthContextProps {
	state: AuthInitialState;
	dispatch: Dispatch<AuthActions>;
}
