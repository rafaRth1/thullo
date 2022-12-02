import { useState, useEffect } from 'react';
import { useForm } from '../../hooks';
import { ImageModalCard, CardColumnOne, CardColumnTwo } from './components';
import { IoCloseCircleOutline } from 'react-icons/io5';

import './ModalFormCreateCard.css';

interface Props {
	isShowModalCard: boolean;
	setIsShowModalCard: React.Dispatch<React.SetStateAction<boolean>>;
	idList: number;
	list: any;
	lists: any;
	setLists: any;
	cardUpdate: CardUpdateProps;
}

interface CardUpdateProps {
	id: number;
	name_card: string;
	attachments: never[];
	comments: never[];
	description: string;
	url_image: string;
}

const formData = {
	url_image: '',
	name_card: '',
	description: '',
	attachments: [],
	comments: [],
};

const formValidations = {
	url_image: [(value: string) => value.length >= 6, 'Name de la Imagen es negable'],
	name_card: [(value: string) => value.length >= 6, 'Name de la carta es negable'],
	description: [(value: any) => value.length >= 1, 'Nombre de la descripcion es negable'],
	comments: [(value: any) => value.length >= 0, 'Seccion de Comentarios'],
	attachments: [(value: string) => value.length >= 0, 'Name de los archivos es negable'],
};

export const ModalFormCreateCard = ({
	isShowModalCard,
	setIsShowModalCard,
	idList,
	list,
	lists,
	setLists,
	cardUpdate,
}: Props) => {
	const { formState, formValidation, onInputChange, setFormState } = useForm(formData, formValidations);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleAddCard = () => {
		let listSelectID = lists.find((list: any) => list.id === idList);
		let cardExits = list.cards.find((card: any) => card.id === formState.id);
		let cardUpdate = list.cards.findIndex((card: any) => card.id === formState.id);

		if (cardExits) {
			listSelectID.cards[cardUpdate] = {
				...listSelectID.cards[cardUpdate],
				...formState,
			};

			setLists([...lists]);
		} else {
			listSelectID.cards = [
				...listSelectID.cards,
				{
					id: Date.now(),
					...formState,
				},
			];

			setLists([...lists]);
		}

		setFormSubmitted(true);
	};

	useEffect(() => {
		setFormState(cardUpdate);
	}, [cardUpdate]);

	return (
		<div className={`modal-form-create-card z-50 ${isShowModalCard ? 'activeModalCard' : ''}`}>
			<div
				className={`modal-form-create-card-content p-5 rounded-xl bg-slate-200 ${
					isShowModalCard ? 'pointer-events-auto' : ''
				}`}>
				<div
					className='close-modal-form-card absolute right-3 top-3 z-30 cursor-pointer'
					onClick={() => {
						setIsShowModalCard(false),
							setFormState({
								url_image: '',
								name_card: '',
								description: '',
								attachments: [],
								comments: [],
							});
					}}>
					<IoCloseCircleOutline size={30} />
				</div>

				<ImageModalCard />

				<div className='flex mt-5'>
					<div className='card-column-one'>
						<CardColumnOne
							formState={formState}
							onInputChange={onInputChange}
							formValidation={formValidation}
							formSubmitted={formSubmitted}
							cardUpdate={cardUpdate}
						/>
					</div>

					<div className='card-column-two flex-1'>
						<CardColumnTwo />
					</div>
				</div>

				<div>
					<button
						className='bg-blue-500 block py-1 mx-auto my-1 w-32 rounded-xl'
						onClick={handleAddCard}>
						{formState.name_card.length > 0 ? 'Actualizar' : 'Crear'}
					</button>
				</div>
			</div>
		</div>
	);
};
