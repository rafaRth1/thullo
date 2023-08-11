export * from './ListTaskCardTypes';
export * from './ModalContextProps';
import { CardStateProps } from './ListTaskCardTypes';

export interface ProjectTypes {
	_id: string;
	name: string;
	name_img: string;
	description?: string;
	collaborators: any[];
	creator: string;
	type: string;
}

export interface ListTypes {
	_id: string;
	name: string;
	taskCards: CardStateProps[];
}

export interface TypeCollaborator {
	_id: string;
	name: string;
	email: string;
	colorImg: string;
}
