export * from './ModalContextProps';

export interface ProjectTypes {
	_id: string;
	name: string;
	name_img: string;
	description?: string;
	collaborators: MemberType[];
	creator: string;
	type: string;
}

export interface ListTypes {
	_id: string;
	name: string;
	taskCards: TaskCardTypes[];
}

export interface TaskCardTypes {
	_id?: string;
	nameCard: string;
	description: string;
	imgUlr: string;
	attachments: any[];
	comments: CommentTypes[];
	members: MemberType[];
	labels: LabelsTypes[];
	list?: string;
}

export interface CommentTypes {
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

export interface LabelsTypes {
	_id?: string;
	nameLabel: string;
	nameColor: string;
	color: string;
	colorLight: string;
}

export interface MemberType {
	_id: string;
	colorImg: string;
	email?: string;
	name: string;
}
