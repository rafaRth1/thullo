import { ProjectTypes } from '@interfaces/index';

export interface InitialStateSlice {
	loading: boolean;
	error: ErrorType;
	projects: ProjectTypes[];
}

interface ErrorType {
	type: boolean;
	msg: string;
}
