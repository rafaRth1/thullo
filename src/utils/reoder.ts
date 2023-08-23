import { ListTypes } from '@interfaces/';

export const reorder = (list: ListTypes, startIndex: number, endIndex: number) => {
	const result = Array.from(list.taskCards);
	const [itemToAdd] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, itemToAdd);
	return result;
};
