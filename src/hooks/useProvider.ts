import { useContext } from 'react';
import { AppContext, AppContextProps } from '../context';

export const useProvider = () => {
	return useContext<AppContextProps>(AppContext);
};
