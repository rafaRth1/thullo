import { useState } from 'react';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { LabelElement } from '../';
import {
	AttachmentsModalCard,
	CommentsModalCard,
	ImageModalCard,
	InputDescriptionCard,
	InputNameCard,
} from './components';
import { IoCloseCircleOutline, IoPeopleOutline, IoPersonCircleOutline } from 'react-icons/io5';
import './ModalFormCreateCard.css';
import { handleShowModalCard } from '../../store';

const formData = {
	nameCard: '',
	description: '',
	comments: '',
};

const formValidations = {
	nameCard: [(value: string) => value.length >= 6, 'Name de la carta es negable'],
	description: [(value: string) => value.length >= 6, 'Nombre de la descripcion es negable'],
	comments: [(value: string) => value.length >= 6, 'Comentario invalido'],
};

export const ModalFormCreateCard = () => {
	const { formState, formValidation, onInputChange } = useForm(formData, formValidations);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { showModalCard } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	return (
		<div className={`modal-form-create-card ${showModalCard ? 'activeModalCard' : ''}`}>
			<div
				className={`modal-form-create-card-content p-5 rounded-xl bg-slate-200 ${
					showModalCard ? 'pointer-events-auto' : ''
				}`}>
				<div
					className='close-modal-form-card absolute right-3 top-3 z-30 cursor-pointer'
					onClick={() => dispatch(handleShowModalCard(false))}>
					<IoCloseCircleOutline size={30} />
				</div>

				<ImageModalCard />

				<div className='flex mt-5'>
					<div className='card-column-one'>
						<InputNameCard
							formState={formState}
							onInputChange={onInputChange}
							formValidation={formValidation}
							formSubmitted={formSubmitted}
						/>

						<span className='text-xs text-neutral-500'>in list In Progress</span>

						<InputDescriptionCard />

						<AttachmentsModalCard />

						<CommentsModalCard />
					</div>

					<div className='card-column-two flex-1'>
						<div className='flex items-center text-neutral-500 text-sm self-end'>
							<IoPersonCircleOutline
								size={17}
								className='mr-3'
							/>
							<span>Actions</span>
						</div>

						<div className='actions-labels'>
							<div className='mt-2'>
								<LabelElement label='Members'>
									<IoPeopleOutline />
								</LabelElement>
							</div>

							<div className='mt-2'>
								<LabelElement label='Members'>
									<IoPeopleOutline />
								</LabelElement>
							</div>

							<div className='mt-2'>
								<LabelElement label='Members'>
									<IoPeopleOutline />
								</LabelElement>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
