import { createContext } from 'react';
import { AuthInterface } from './auth-context-interface';

export interface AuthContextProps {
	auth: AuthInterface;
	setAuth: React.Dispatch<React.SetStateAction<AuthInterface>>;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
