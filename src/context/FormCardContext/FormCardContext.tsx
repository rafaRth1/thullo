import { createContext } from 'react';

export interface ValueLabelTypes {
	nameLabel: string;
	palet: {
		name: string;
		color: string;
		color_light: string;
	};
}

export interface FormCardContextProps {
	formState: any;
	setFormState: React.Dispatch<any>;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onResetForm: () => void;
	handleEditNameCard: () => Promise<void>;
	handleEditDescription: () => Promise<void>;
	handleDeleteCard: () => Promise<void>;
	handleAddLabel: (
		value: ValueLabelTypes,
		setValue: React.Dispatch<React.SetStateAction<ValueLabelTypes>>
	) => Promise<void>;
	handleRemoveAvailable: (id: string) => Promise<void>;
	handleSelectImage: (image: any) => Promise<void>;
	handleDeleteImage: () => Promise<void>;
	handleAssignMember: (pickMembers: any) => Promise<void>;
	handleSearch: (
		setValueSearch: React.Dispatch<React.SetStateAction<any[]>>,
		setValue: React.Dispatch<React.SetStateAction<string>>
	) => Promise<void>;
}

export const FormCardContext = createContext<FormCardContextProps>({} as FormCardContextProps);
