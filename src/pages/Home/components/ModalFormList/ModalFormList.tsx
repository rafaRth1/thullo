import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useProvider } from '@hooks/';
import { addListThunk, editListThunk } from '@redux/home/slices/listsSlice';
import { IoCloseCircleOutline } from 'react-icons/io5';
import './ModalFormList.css';

interface Props {
	setIsShowModalFormList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalFormList = ({ setIsShowModalFormList }: Props) => {
	const [nameList, setNameList] = useState('');
	const { lists } = useAppSelector((state) => state.lists);
	const { listCurrent, setListCurrent } = useProvider();
	const { id } = useParams();
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!!listCurrent) {
			handleUpdateList();
		} else {
			handleAddList(nameList, id);
		}
	};

	const handleAddList = async (nameList: string, id?: string) => {
		if (nameList.length <= 4) return;

		await dispatch(addListThunk(id, nameList));
		setIsShowModalFormList(false);
	};

	const handleUpdateList = async () => {
		if (nameList.length <= 4) return;

		await dispatch(editListThunk(listCurrent, nameList));
		setIsShowModalFormList(false);
	};

	const handleCloseAndClear = () => {
		setListCurrent('');
		setIsShowModalFormList(false);
	};

	useEffect(() => {
		const [listSelected] = lists.filter((list) => list._id === listCurrent);

		if (listSelected?.name !== undefined) {
			setNameList(listSelected.name);
		}

		return () => {
			setNameList('');
		};
	}, []);

	return (
		<div className='fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur transition-opacity z-50'>
			<div className='z-30'>
				<form
					onSubmit={(e) => handleSubmit(e)}
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
						{!listCurrent ? 'Create List' : 'Update List'}
					</button>
				</form>

				<div
					className='cursor-pointer absolute top-12 right-12'
					onClick={() => handleCloseAndClear()}>
					<IoCloseCircleOutline
						className='text-white'
						size={30}
					/>
				</div>
			</div>

			<div
				className='absolute top-0 left-0 w-full h-full z-20'
				onClick={() => handleCloseAndClear()}
			/>
		</div>
	);
};
