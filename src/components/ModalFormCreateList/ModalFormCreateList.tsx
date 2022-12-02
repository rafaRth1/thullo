import { useState } from 'react';
import { addListItem, handleShowModal } from '../../store';
import { useAppDispatch, useAppSelector, useForm } from '../../hooks';
import { InputType } from '../';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ModalFormCreateList.css';

const formData = {
	nameList: '',
};

const formValidations = {
	nameList: [(value: string) => value.length >= 6, 'Nombre de lista negable'],
};

export const ModalFormCreateList = ({ lists, setLists }: any) => {
	const { formState, formValidation, onInputChange } = useForm(formData, formValidations);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const { showModal } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	const handleAddList = (e: any) => {
		e.preventDefault();
		// dispatch(addListItem({ nameList: formState.nameList, id: Date.now() }));
		setLists([{ nameList: formState.nameList, id: Date.now(), cards: [] }, ...lists]);
		setFormSubmitted(true);
		dispatch(handleShowModal(false));
	};

	return (
		<div className={`modal-form-create-list ${showModal ? 'activeModal' : ''}`}>
			<div
				className={`modal-form-create-list-content flex flex-col ${
					showModal ? 'pointer-events-auto' : ''
				}`}>
				<form onSubmit={handleAddList}>
					<InputType
						type={'text'}
						label={'Name List'}
						name={'nameList'}
						placeholder='Add Name List'
						value={formState.nameList}
						onChange={onInputChange}
						isvalid={formValidation.nameListValid}
						isvalidform={formSubmitted.toString()}
					/>

					<button
						type='submit'
						className='bg-blue-500 p-2 rounded-xl mt-5 text-white w-full'>
						Create List
					</button>
				</form>
			</div>

			<div
				className='absolute top-12 right-12 cursor-pointer'
				onClick={() => dispatch(handleShowModal(false))}>
				<IoCloseCircleOutline size={30} />
			</div>
		</div>
	);
};
