import { fetchWrapper, RequestMethod } from 'helpers/fetchWrapper';

import { UserDTO } from './User';

export interface UserLogin {
	username: string;
	password: string;
}

export interface LoginResponse extends UserDTO {
	token: string;
}

const PATH = 'Users/authenticate';

export const requestLogin = (body: UserLogin): Promise<LoginResponse> =>
	fetchWrapper<LoginResponse>(PATH, { method: RequestMethod.POST, body });
