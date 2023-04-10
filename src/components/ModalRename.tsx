import { useState } from 'react';
import clientAxios from '../config/clientAxios';
import { useProvider } from '../hooks';

export const ModalRename = () => {
	const [nameList, setNameList] = useState('');
	const { setLists, modalRename, setModalRename, listCurrent, setListCurrent, lists } = useProvider();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem('token');

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			const listUpdate = Object.assign({}, lists);
			const [column] = listUpdate.lists.filter((list: any) => list._id === listCurrent);
			const columnIndex = listUpdate.lists.indexOf(column);
			const newColumn = Object.assign({}, column);

			const { data } = await clientAxios.put(`/list/${listCurrent}`, { name: nameList }, config);

			newColumn.name = data.name;
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);

			setListCurrent('');
			setModalRename(false);
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div
			className={`fixed inset-0 w-full flex-col h-full flex justify-center items-center backdrop-blur transition-opacity z-50 ${
				modalRename ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
			}`}>
			<form
				className='flex flex-col z-50'
				onSubmit={(e) => handleSubmit(e)}>
				<input
					type='text'
					placeholder='Editar Nombre'
					className='p-3 outline-none rounded-xl bg-neutral-600 text-white mb-5'
					value={nameList}
					onChange={(e) => setNameList(e.target.value)}
				/>

				<button className='text-white bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded-lg'>
					Edit Name
				</button>
			</form>
			<div
				className='absolute top-0 left-0 w-full h-full z-40'
				onClick={() => {
					setModalRename(false);
				}}></div>
		</div>
	);
};
