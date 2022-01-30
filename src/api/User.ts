import { fetchWrapper, RequestMethod } from 'helpers/fetchWrapper';

export interface UserDTO {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
}

const PATH = 'Users';

export const getUsers = (): Promise<UserDTO[]> => fetchWrapper<UserDTO[]>(PATH, { method: RequestMethod.GET });
