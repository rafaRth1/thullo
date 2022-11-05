import { useState } from 'react';
import { AddElementLabel } from '../AddElementLabel';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { ModalFormCreateCard } from '../ModalFormCreateCard/ModalFormCreateCard';
import { Card } from './Components/Card/Card';

export const ListCard = ({ list }: any) => {
	const [isShowModalCard, setIsShowModalCard] = useState(false);
	const [cards, setCards] = useState<any[]>([]);

	return (
		<div className='contenedor-list'>
			<div className='header-list flex justify-between items-center cursor-pointer'>
				<span className='flex-1'>{list.nameList}</span>
				<IoEllipsisHorizontalSharp />
			</div>

			{cards.map((card) => (
				<Card
					key={card.id}
					{...card}
				/>
			))}

			<div className='mt-5'>
				<AddElementLabel
					text='Add Another Card'
					handleDispatch={() => setIsShowModalCard(!isShowModalCard)}
				/>
			</div>

			<ModalFormCreateCard
				isShowModalCard={isShowModalCard}
				setIsShowModalCard={setIsShowModalCard}
				cards={cards}
				setCards={setCards}
			/>
		</div>
	);
};
