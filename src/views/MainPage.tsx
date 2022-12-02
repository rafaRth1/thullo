import { useState } from 'react';
import { handleShowModal } from '../store';
import { useAppDispatch } from '../hooks';
import { ModalFormCreateList, AddElementLabel, ListCard } from '../components';

export interface AppTypes {
	nameList: string;
	id: number;
	cards: [];
}

export const MainPage = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [lists, setLists] = useState<any[]>([
		{
			nameList: 'New Header 1',
			id: 1,
			cards: [
				{
					attachments: [],
					comments: [],
					description: '',
					id: 1669328877012,
					name_card: 'Github jobs challenge',
					url_image: '',
				},

				{
					attachments: [],
					comments: [],
					description: '',
					id: 1669328877016,
					name_card: '✋🏿 Move anything that is actually started here',
					url_image: '',
				},

				{
					attachments: [],
					comments: [],
					description: '',
					id: 16693288770125,
					name_card: 'Add finishing touches for Windbnb solution',
					url_image: '',
				},
			],
		},

		{
			nameList: 'New Header 2',
			id: 2,
			cards: [
				{
					attachments: [],
					comments: [],
					description: '',
					id: 1669328877015,
					name_card: '✋🏿 Move anything ',
					url_image: '',
				},
			],
		},

		{
			nameList: 'New Header 3',
			id: 3,
			cards: [
				{
					attachments: [],
					comments: [],
					description: '',
					id: 1669328877017,
					name_card: '✋🏿 Move anything from doing to done here',
					url_image: '',
				},
			],
		},
	]);

	const dispatch = useAppDispatch();
	const handleDragging = (dragging: boolean) => setIsDragging(dragging);
	const handleUpdateList = (id: number, idList: number) => {
		let listNext = lists.find((item) => item.id === idList);

		let cardPrev;
		let listPrev: any;
		lists.map((list: any) => {
			list.cards.map((card: any) => {
				if (card.id === id) {
					cardPrev = card;
					listPrev = list;
				}
			});
		});

		let cardRemove: any[] = listPrev.cards.filter((item: any) => item.id !== id);

		if (listNext.id === listPrev.id) {
			listPrev.cards = [...listPrev.cards];
		} else {
			listNext.cards = [...listNext.cards, cardPrev];
			listPrev.cards = [...cardRemove];
		}

		setLists([...lists]);
	};

	return (
		<main className='contenedor'>
			<div className='main-content flex'>
				{lists.map((list) => (
					<ListCard
						key={list.id}
						lists={lists}
						setLists={setLists}
						isDragging={isDragging}
						handleDragging={handleDragging}
						handleUpdateList={handleUpdateList}
						list={list}
					/>
				))}

				<div className='contenedor-list'>
					<AddElementLabel
						text='Add Another List'
						handleDispatch={() => dispatch(handleShowModal(true))}
					/>
				</div>
			</div>

			<ModalFormCreateList
				lists={lists}
				setLists={setLists}
			/>
		</main>
	);
};
