import { createContext } from 'react';

export interface AuthContextProps {
	auth: any;
	setAuth: React.Dispatch<React.SetStateAction<{}>>;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
