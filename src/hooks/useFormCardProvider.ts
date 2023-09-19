import { useContext } from 'react';
import { FormCardContext, FormCardContextProps } from '@context/';

export const useFormCardProvider = () => {
	return useContext<FormCardContextProps>(FormCardContext);
};
