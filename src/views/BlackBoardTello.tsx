import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import clientAxios from '../config/clientAxios';
import { useProvider } from '../hooks';
import { AddElementLabel, Spinner, ListTaskCard } from '../components';
import { DragDropContext } from 'react-beautiful-dnd';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../utils';

const reorder = (list: any, startIndex: any, endIndex: any) => {
	const array = Array.from(list.taskCards);
	const result = Array.from(list.taskCards);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	// if (startIndex !== endIndex) {
	// 	// try {
	// 	// 	const { data } = await clientAxios.put(`/taskCard/order-tasks${list._id}`, { result });
	// 	// } catch (error) {
	// 	// 	console.log(error);
	// 	// }

	// 	return result;
	// } else {
	// 	return array;
	// }

	return result;
};

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const columnNames = ['Lorem', 'Ipsum', 'Consectetur', 'Eiusmod'];

const cardColors = [
	'azure',
	'beige',
	'bisque',
	'blanchedalmond',
	'burlywood',
	'cornsilk',
	'gainsboro',
	'ghostwhite',
	'ivory',
	'khaki',
];

const pickColor = () => {
	let rand = Math.floor(Math.random() * 10);
	return cardColors[rand];
};

const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
	const sourceClone = Array.from(source.taskCards);
	const destClone = Array.from(destination.taskCards);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result: any = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

export const BlackBoardTello = () => {
	const { lists, setLists, showModalFormList, setAlertHigh, loading, setLoading, setProject } =
		useProvider();

	const [state, setState] = useState({
		scene: {
			type: 'container',
			props: {
				orientation: 'horizontal',
			},

			children: generateItems(4, (i: any) => ({
				id: `column${i}`,
				type: 'container',
				name: columnNames[i],
				props: {
					orientation: 'vertical',
					className: 'card-container',
				},
				children: generateItems(+(Math.random() * 10).toFixed() + 5, (j: any) => ({
					type: 'draggable',
					id: `${i}${j}`,
					props: {
						className: 'card',
						style: { backgroundColor: pickColor() },
					},
					data: lorem.slice(0, Math.floor(Math.random() * 150) + 30),
				})),
			})),
		},
	});

	const { id } = useParams();

	// const onDragEnd = async (result: any) => {
	// 	const { source, destination } = result;

	// 	if (!destination) {
	// 		return;
	// 	}

	// 	const sInd = +source.droppableId;
	// 	const dInd = +destination.droppableId;

	// 	if (sInd === dInd) {
	// 		const items: any = reorder(lists[sInd], source.index, destination.index);
	// 		const newState: any = [...lists];
	// 		newState[sInd].taskCards = items;
	// 		setLists(newState);
	// 	} else {
	// 		const result: any = move(lists[sInd], lists[dInd], source, destination);
	// 		const newState: any = [...lists];
	// 		newState[sInd].taskCards = result[sInd];
	// 		newState[dInd].taskCards = result[dInd];

	// 		setLists(newState);
	// 	}
	// };

	useEffect(() => {
		const getLists = async () => {
			try {
				const token = localStorage.getItem('token');

				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				};

				const { data } = await clientAxios(`/list/${id}`, config);
				setProject(data.project);
				setLists(data.lists);
				setLoading(false);
			} catch (error) {
				setAlertHigh({
					msg: 'Error obtener listas',
					error: true,
				});
			}
		};

		getLists();
	}, []);

	const onColumnDrop = (dropResult: any) => {
		const scene = Object.assign({}, state.scene);
		scene.children = applyDrag(scene.children, dropResult);
		setState({
			scene,
		});
	};

	const onCardDrop = (columnId: any, dropResult: any) => {
		if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
			const scene = Object.assign({}, state.scene);
			const column = scene.children.filter((p) => p.id === columnId)[0];
			const columnIndex = scene.children.indexOf(column);

			const newColumn = Object.assign({}, column);
			newColumn.children = applyDrag(newColumn.children, dropResult);
			scene.children.splice(columnIndex, 1, newColumn);

			setState({
				scene,
			});
		}
	};

	const getCardPayload = (columnId: any, index: any) => {
		return state.scene.children.filter((p) => p.id === columnId)[0].children[index];
	};

	return (
		<main className='relative grow p-2'>
			{/* {loading ? (
				<Spinner />
			) : (
				<div className='lists flex overflow-x-auto absolute inset-0'>
					<DragDropContext onDragEnd={onDragEnd}>
						{lists.map((list, indexList) => (
							<ListTaskCard
								key={list._id}
								list={list}
								indexList={indexList}
							/>
						))}
					</DragDropContext>

					<div className='contenedor-list'>
						<AddElementLabel
							text='Add Another List'
							handleDispatch={showModalFormList}
						/>
					</div>
				</div>
			)} */}

			<div className='card-scene'>
				<Container
					onDrop={onColumnDrop}
					orientation='horizontal'
					dragHandleSelector='.column-drag-handle'
					dropPlaceholder={{
						animationDuration: 150,
						showOnTop: true,
						className: 'cards-drop-preview',
					}}>
					{state.scene.children.map((column: any) => (
						<Draggable key={column.id}>
							<div className={column.props.className}>
								<div className='card-column-header'>
									<span className='column-drag-handle'>&#x2630;</span>
									{column.name}
								</div>

								<Container
									{...column.props}
									groupName='col'
									onDragStart={(e) => console.log('drag started', e)}
									onDragEnd={(e) => console.log('drag end', e)}
									onDrop={(e) => onCardDrop(column.id, e)}
									getChildPayload={(index) => getCardPayload(column.id, index)}
									dragClass='card-ghost'
									dropClass='card-ghost-drop'
									onDragEnter={() => {
										console.log('drag enter:', column.id);
									}}
									onDragLeave={() => {
										console.log('drag leave:', column.id);
									}}
									onDropReady={(p) => console.log('Drop ready: ', p)}
									dropPlaceholder={{
										animationDuration: 150,
										showOnTop: true,
										className: 'drop-preview',
									}}
									dropPlaceholderAnimationDuration={200}>
									{column.children.map((card: any) => {
										return (
											<Draggable key={card.id}>
												<div {...card.props}>
													<p>{card.data}</p>
												</div>
											</Draggable>
										);
									})}
								</Container>
							</div>
						</Draggable>
					))}
				</Container>
			</div>
		</main>
	);
};
