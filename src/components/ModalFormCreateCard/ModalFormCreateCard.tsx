import { useState } from 'react';
import { useAppSelector, useForm } from '../../hooks';
import { ImageModalCard, CardColumnOne, CardColumnTwo } from './components';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ModalFormCreateCard.css';

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

export const ModalFormCreateCard = ({ cards, setCards, isShowModalCard, setIsShowModalCard }: any) => {
	const { formState, formValidation, onInputChange } = useForm(formData, formValidations);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleAddCard = () => {
		setCards([
			...cards,
			{
				id: Date.now(),
				...formState,
			},
		]);
		setFormSubmitted(true);
	};

	return (
		<div className={`modal-form-create-card ${isShowModalCard ? 'activeModalCard' : ''}`}>
			<div
				className={`modal-form-create-card-content p-5 rounded-xl bg-slate-200 ${
					isShowModalCard ? 'pointer-events-auto' : ''
				}`}>
				<div
					className='close-modal-form-card absolute right-3 top-3 z-30 cursor-pointer'
					onClick={() => setIsShowModalCard(false)}>
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
						Crear
					</button>
				</div>
			</div>
		</div>
	);
};
