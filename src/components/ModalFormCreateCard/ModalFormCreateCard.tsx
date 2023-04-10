import { useEffect, useState } from 'react';
import { useForm, useProvider } from '../../hooks';
import { CardColumnOne, CardColumnTwo } from './components';
import { formData, formValidations } from './initialValuesForm';
import { IoCloseCircleOutline } from 'react-icons/io5';

import './ModalFormCreateCard.css';

export const ModalFormCreateCard = (): JSX.Element => {
	const { formState, setFormState, onInputChange, onResetForm } = useForm(formData, formValidations);
	const { submitCard, setListCurrent, isShowModalCard, setIsShowModalCard, cardUpdate } = useProvider();
	const [clearValue, setClearValue] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await submitCard({
			_id: formState._id,
			nameCard: formState.nameCard,
			imgUlr: formState.imgUlr,
			description: formState.description,
			members: formState.members,
			labels: formState.labels,
			comments: formState.comments,
			attachments: formState.attachments,
			list: formState.list,
		});
	};

	const closeModal = () => {
		setIsShowModalCard(false);
		setClearValue(!clearValue);
		setListCurrent('');
	};

	useEffect(() => {
		setFormState(cardUpdate);

		return () => {
			onResetForm();
		};
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
							/>
						</div>

						<div className='card-column-two relative flex-1'>
							<CardColumnTwo
								formState={formState}
								setFormState={setFormState}
								setIsShowModalCard={setIsShowModalCard}
							/>
						</div>
					</div>
				</>

				{/* <input
					type='button'
					className='bg-blue-600 block py-1 mx-auto my-1 w-32 rounded-xl text-sm text-white'
					value={`${!!formState?._id ? 'Actualizar' : 'Crear'} `}
				/> */}

				{!formState?._id ? (
					<input
						type='submit'
						className='bg-blue-600 block py-1 mx-auto my-1 w-32 rounded-xl text-sm text-white cursor-pointer'
						value='Crear'
					/>
				) : null}
			</form>
		</div>
	);
};
