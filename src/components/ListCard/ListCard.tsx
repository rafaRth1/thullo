import { useState } from 'react';
import { handleShowModalCard } from '../../store';
import { useAppDispatch } from '../../hooks';
import { AddElementLabel } from '../AddElementLabel';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

export const ListCard = ({ list }: any) => {
	const [cards, setCards] = useState([]);
	const dispatch = useAppDispatch();

	return (
		<div className='contenedor-list'>
			<div className='header-list flex justify-between items-center cursor-pointer'>
				<span className='flex-1'>{list.nameList}</span>
				<IoEllipsisHorizontalSharp />
			</div>

			<div className='mt-5'>
				<AddElementLabel
					text='Add Another Card'
					handleDispatch={() => dispatch(handleShowModalCard(true))}
				/>
			</div>
		</div>
	);
};
