import { Dispatch } from 'react';

import { LoginResponse, requestLogin, UserLogin } from 'api/Login';

import { ActionType, AuthActions } from './types';

export async function loginUser(
	dispatch: Dispatch<AuthActions>,
	loginPayload: UserLogin
): Promise<LoginResponse | undefined> {
	try {
		dispatch({ type: ActionType.LOGIN_REQUEST, payload: { loading: true } });
		const response = await requestLogin(loginPayload);

		if (response) {
			console.log(response);
			const { token, ...user } = response;

			dispatch({ type: ActionType.LOGIN_SUCCESS, payload: { token, user } });
			localStorage.setItem('access_token', JSON.stringify(token));
			localStorage.setItem('user', JSON.stringify(user));

			return response;
		}
	} catch (error) {
		console.error('error', error);
		dispatch({ type: ActionType.LOGIN_ERROR, payload: { error: error as any } });
	}
}

export async function logout(dispatch: Dispatch<AuthActions>): Promise<void> {
	dispatch({ type: ActionType.LOGOUT });
}

export async function checkLoggedInUser(dispatch: Dispatch<AuthActions>): Promise<void> {
	dispatch({ type: ActionType.CHECK_LOGGED_IN });
}
