import { CardStateProps, ListTypes } from '@interfaces/index';
import { DraggableLocation } from 'react-beautiful-dnd';

interface ResultMoveDrag {
	0: CardStateProps[];
	1: CardStateProps[];
}

export const moveDrag = (
	source: ListTypes,
	destination: ListTypes,
	droppableSource: DraggableLocation,
	droppableDestination: DraggableLocation
) => {
	const sourceClone = Array.from(source.taskCards);
	const destinationClone = Array.from(destination.taskCards);
	const [removed] = sourceClone.splice(droppableSource.index, 1);
	destinationClone.splice(droppableDestination.index, 0, removed);

	const result = {} as ResultMoveDrag;

	result[parseInt(droppableSource.droppableId) as keyof typeof result] = sourceClone;
	result[parseInt(droppableDestination.droppableId) as keyof typeof result] = destinationClone;

	return result;
};
