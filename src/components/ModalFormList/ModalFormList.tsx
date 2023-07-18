import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProvider } from '../../hooks';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ModalFormList.css';

export const ModalFormList = (): JSX.Element => {
	const [nameList, setNameList] = useState('');
	const { addList, setIsShowModalFormList } = useProvider();
	const { id } = useParams();

	return (
		<div className='fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur transition-opacity z-50'>
			<div className='z-30'>
				<form
					onSubmit={(e) => addList(e, nameList, id)}
					className='flex flex-col w-80'>
					<input
						type='text'
						name='nameList'
						placeholder='Add Name List'
						className='bg-neutral-600 text-white outline-none rounded-xl mb-5 p-3'
						value={nameList}
						onChange={(e) => setNameList(e.target.value)}
					/>

					<button
						type='submit'
						className='text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-2'>
						Create List
					</button>
				</form>

				<div
					className='cursor-pointer absolute top-12 right-12'
					onClick={() => setIsShowModalFormList(false)}>
					<IoCloseCircleOutline
						className='text-white'
						size={30}
					/>
				</div>
			</div>

			<div
				className='absolute top-0 left-0 w-full h-full z-20'
				onClick={() => setIsShowModalFormList(false)}
			/>
		</div>
	);
};
