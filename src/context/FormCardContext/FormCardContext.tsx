import { createContext } from 'react';
import { CardStateProps } from '../../interfaces';

export interface ValueLabelTypes {
	nameLabel: string;
	palet: {
		name: string;
		color: string;
		colorLight: string;
	};
}

export interface FormCardContextProps {
	formState: CardStateProps;
	setFormState: React.Dispatch<CardStateProps>;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onResetForm: () => void;
	handleAddLabel: (
		value: ValueLabelTypes,
		setValue: React.Dispatch<React.SetStateAction<ValueLabelTypes>>
	) => Promise<void>;
	deleteLabel: (id: string) => Promise<void>;
	handleSelectImage: (image: any) => Promise<void>;
	handleDeleteImage: () => Promise<void>;
	handleAssignMember: (pickMembers: any) => Promise<void>;
	handleSearchUser: (
		setValueSearch: React.Dispatch<React.SetStateAction<any[]>>,
		setValue: React.Dispatch<React.SetStateAction<string>>
	) => Promise<void>;
}

export const FormCardContext = createContext<FormCardContextProps>({} as FormCardContextProps);
