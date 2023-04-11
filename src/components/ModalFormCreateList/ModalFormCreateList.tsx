import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../hooks';
import { IoCloseCircleOutline } from 'react-icons/io5';

import './ModalFormCreateList.css';

export const ModalFormCreateList = (): JSX.Element => {
	const [nameList, setNameList] = useState<string>('');
	const { modalFormList, showModalFormList, handleAddList } = useProvider();
	const { id } = useParams();

	return (
		<div
			className={`modal-form-create-list z-50 ${modalFormList ? 'pointer-events-auto opacity-100' : ''}`}>
			<div
				className={`modal-form-create-list-content flex flex-col ${
					modalFormList ? 'pointer-events-auto' : ''
				}`}>
				<form onSubmit={(e) => handleAddList(e, nameList, id)}>
					<input
						type='text'
						name='nameList'
						placeholder='Add Name List'
						className='rounded-3xl outline-none w-full px-3 py-2 bg-neutral-300 text-gray-500 my-2 transition-all'
						value={nameList}
						onChange={(e) => setNameList(e.target.value)}
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
				onClick={showModalFormList}>
				<IoCloseCircleOutline
					className='text-white'
					size={30}
				/>
			</div>

			<div
				className='absolute top-0 left-0 w-full h-full z-40'
				onClick={showModalFormList}></div>
		</div>
	);
};
