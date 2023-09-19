import { createContext } from 'react';
import { TaskCardTypes } from '../../interfaces';

export interface FormCardContextProps {
	cardUpdate: TaskCardTypes;
	setCardUpdate: React.Dispatch<React.SetStateAction<TaskCardTypes>>;
}

export const FormCardContext = createContext<FormCardContextProps>({} as FormCardContextProps);
