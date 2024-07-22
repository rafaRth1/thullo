export const applyDrag = (columnList: any[], dragResult: any) => {
	const { removedIndex, addedIndex, payload } = dragResult;

	if (removedIndex === null && addedIndex === null) return columnList;

	let result = [...columnList];

	let itemToAdd = payload;

	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0];
	}

	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd);
	}

	return result;
};
