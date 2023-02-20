import { useEffect, memo, useState } from 'react';
import { useForm, useProvider } from '../../hooks';
import { CardColumnOne, CardColumnTwo } from './components';
import { formData, formValidations } from './initialValuesForm';
import { CardUpdateProps } from '../ListCard/types/CardUpdateProps';
import clientAxios from '../../config/clientAxios';
import { IoCloseCircleOutline } from 'react-icons/io5';

import './ModalFormCreateCard.css';

interface Props {
	idList: string;
	list: any;
	isShowModalCard: boolean;
	setIsShowModalCard: React.Dispatch<React.SetStateAction<boolean>>;
	cardUpdate: CardUpdateProps;
	cards: any[];
	setCards: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ModalFormCreateCard = memo(
	({ list, isShowModalCard, setIsShowModalCard, cardUpdate, cards, setCards }: Props): JSX.Element => {
		const { formState, setFormState, onInputChange } = useForm(formData, formValidations);
		const { setAlertHigh, setOverflow } = useProvider();
		const [clearValue, setClearValue] = useState(false);

		const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
			e?.preventDefault();

			if (formState?._id) {
				handleEditCard();
			} else {
				handleAddCard();
			}
		};

		const handleEditCard = async () => {
			let cardUpdateIndex = list.taskCards.findIndex((card: any) => card._id === formState._id);

			try {
				const { data } = await clientAxios.put(`/taskCard/${formState._id}`, formState);
				cards[cardUpdateIndex] = data;
				setCards([...cards]);
			} catch (error) {
				setAlertHigh({
					msg: 'Error al editar',
					error: true,
				});
			}
		};

		const handleAddCard = async () => {
			try {
				const { data } = await clientAxios.post('/taskCard', { ...formState, list: list._id });
				setCards([...cards, data]);
				setOverflow(false);
				setIsShowModalCard(false);
			} catch (error) {
				setAlertHigh({
					msg: 'Error al crear un card',
					error: true,
				});
			}
		};

		const closeModal = () => {
			// handleSubmit();
			setIsShowModalCard(false);
			setOverflow(false);
			setClearValue(!clearValue);
		};

		useEffect(() => {
			setFormState(cardUpdate);
		}, [cardUpdate]);

		return (
			<div className={`modal-form-create-card z-50 ${isShowModalCard ? 'active-modal-card' : ''}`}>
				<form
					className={`modal-form-create-card-content relative p-5 bg-neutral-800 rounded-lg ${
						isShowModalCard ? 'pointer-events-auto' : ''
					}`}
					onSubmit={(e) => handleSubmit(e)}>
					<div
						className='close-modal-form-card absolute right-2 top-3 z-30 cursor-pointer'
						onClick={closeModal}>
						<IoCloseCircleOutline
							className='text-white'
							size={30}
						/>
					</div>

					<>
						<div className='w-full rounded-xl mb-3'>
							{!!formState?.imgUlr ? (
								<img
									src={formState.imgUlr}
									alt='image-card'
									className='h-full w-full object-cover'
									style={{ height: '130px' }}
								/>
							) : null}
						</div>

						<div className='flex'>
							<div className='card-column-one'>
								<CardColumnOne
									formState={formState}
									setFormState={setFormState}
									onInputChange={onInputChange}
									clearValue={clearValue}
									cards={cards}
									setCards={setCards}
								/>
							</div>

							<div className='card-column-two relative flex-1'>
								<CardColumnTwo
									formState={formState}
									setFormState={setFormState}
									clearValue={clearValue}
									setCards={setCards}
									setIsShowModalCard={setIsShowModalCard}
								/>
							</div>
						</div>
					</>

					<button
						type='submit'
						className='bg-blue-600 block py-1 mx-auto my-1 w-32 rounded-xl text-sm text-white'>
						{`${!!formState?._id ? 'Actualizar' : 'Crear'} `}
					</button>
				</form>
			</div>
		);
	}
);
