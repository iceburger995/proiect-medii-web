import { fetchWrapper, RequestMethod } from 'helpers/fetchWrapper';

export interface UserDTO {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
}

export interface RegisterUserDTO extends UserDTO {
	password: string;
}

const PATH = 'Users';

export const getUsers = (): Promise<UserDTO[]> => fetchWrapper<UserDTO[]>(PATH, { method: RequestMethod.GET });

export const getUser = (id: string): Promise<UserDTO> =>
	fetchWrapper<UserDTO>(`${PATH}/${Number(id)}`, { method: RequestMethod.GET });

export const createUser = (body: RegisterUserDTO): Promise<UserDTO> =>
	fetchWrapper<UserDTO>(`${PATH}/register`, { method: RequestMethod.POST, body });

export const updateUser = (body: UserDTO): Promise<UserDTO> =>
	fetchWrapper<UserDTO>(`${PATH}/${Number(body.id)}`, { method: RequestMethod.PUT, body });
