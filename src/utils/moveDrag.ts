import { TaskCardTypes, ListTypes } from '@interfaces/index';
import { DraggableLocation } from 'react-beautiful-dnd';

interface ResultMoveDrag {
	0: TaskCardTypes[];
	1: TaskCardTypes[];
	idCard: string | any;
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

	const result: ResultMoveDrag = {} as ResultMoveDrag;

	result[parseInt(droppableSource.droppableId) as keyof ResultMoveDrag] = sourceClone;
	result[parseInt(droppableDestination.droppableId) as keyof ResultMoveDrag] = destinationClone;
	result.idCard = removed._id!;

	return result;
};
