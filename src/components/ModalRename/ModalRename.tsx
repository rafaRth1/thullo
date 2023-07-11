import clientAxios from '../../config/clientAxios';
import { useState } from 'react';
import { useProvider } from '../../hooks';
import { IoCloseCircleOutline } from 'react-icons/io5';

export const ModalRename = (): JSX.Element => {
	const [nameList, setNameList] = useState('');
	const { setLists, setIsShowModalRename, listCurrent, setListCurrent, lists } = useProvider();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (nameList.length <= 4) {
			return;
		}

		try {
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const listUpdate = { ...lists };
			const [column] = listUpdate.lists.filter((list: any) => list._id === listCurrent);
			const columnIndex = listUpdate.lists.indexOf(column);
			const newColumn = { ...column };

			const { data } = await clientAxios.put(`/list/${listCurrent}`, { name: nameList }, config);

			newColumn.name = data.name;

			listUpdate.lists.splice(columnIndex, 1, newColumn);

			setLists(listUpdate);
			setListCurrent('');
			setIsShowModalRename(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='fixed inset-0 w-full flex-col h-full flex justify-center items-center backdrop-blur transition-opacity z-50'>
			<div className='z-30'>
				<form
					className='flex flex-col w-80'
					onSubmit={(e) => handleSubmit(e)}>
					<input
						type='text'
						placeholder='Editar Nombre'
						className='bg-neutral-600 text-white outline-none rounded-xl mb-5 p-3'
						value={nameList}
						onChange={(e) => setNameList(e.target.value)}
					/>

					<button className='text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-2'>
						Edit Name
					</button>
				</form>

				<div
					className='absolute top-12 right-12 cursor-pointer'
					onClick={() => setIsShowModalRename(false)}>
					<IoCloseCircleOutline
						className='text-white'
						size={30}
					/>
				</div>
			</div>

			<div
				className='absolute top-0 left-0 w-full h-full z-20'
				onClick={() => {
					setIsShowModalRename(false);
				}}
			/>
		</div>
	);
};
