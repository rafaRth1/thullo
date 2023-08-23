export * from './ModalContextProps';

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

export interface CardStateProps {
	_id?: string;
	nameCard: string;
	description: string;
	imgUlr: string;
	attachments: any[];
	comments: TypeComment[];
	members: any[];
	labels: any[];
	list?: string;
}

export interface TypeComment {
	_id?: string;
	comment: string;
	author: string;
	name: string;
	colorImg: string;
	dateCurrent: string;
	taskCard: string | undefined;
	createdAt?: string | null;
	updatedAt?: string | null;
}

export interface TypeCollaborator {
	_id: string;
	name: string;
	email: string;
	colorImg: string;
}
