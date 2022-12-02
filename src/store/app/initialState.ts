import { AppTypes } from './types';

export const initialState: AppTypes = {
	loading: false,
	showModal: false,
	showModalCard: false,
	lists: [
		{
			nameList: 'New Header UI',
			id: 1667788929064,
			cards: [],
		},

		{
			nameList: 'New Header UI 2',
			id: 1667788929061,
			cards: [],
		},
	],
};
