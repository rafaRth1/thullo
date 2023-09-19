import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ModalHeader, ModalContent, ModalBody } from '@components/Modal';
import { useBoardProvider } from '@hooks/';
import { useAddListMutation, useEditListMutation } from '@redux/home/apis';
import './ModalFormList.css';

export const ModalFormList = () => {
	const [nameList, setNameList] = useState('');
	const { listCurrent, setListCurrent, listsArray } = useBoardProvider();
	const [addList] = useAddListMutation();
	const [editList] = useEditListMutation();
	const { id } = useParams();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, onOpenChange: () => void) => {
		e.preventDefault();

		if (nameList.length <= 4) return;

		if (listCurrent._id) {
			await handleEditList();
			onOpenChange();
		} else {
			await handleAddList();
			onOpenChange();
		}
	};

	const handleAddList = async () => {
		try {
			await addList({
				name: nameList,
				project: id,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditList = async () => {
		try {
			await editList({
				idList: listCurrent._id,
				name: nameList,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const [listSelected] = listsArray.filter((list) => list._id === listCurrent._id);

		if (listSelected?.name !== undefined) {
			setNameList(listSelected.name);
		}

		return () => {
			setNameList('');
		};
	}, []);

	return (
		<ModalContent>
			{(onOpenChange) => (
				<>
					<ModalHeader className='text-white font-medium'>Form Create List</ModalHeader>

					<ModalBody>
						<form
							onSubmit={(e) => handleSubmit(e, onOpenChange)}
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
								{!listCurrent._id ? 'Create List' : 'Update List'}
							</button>
						</form>
					</ModalBody>
				</>
			)}
		</ModalContent>
	);
};

{
	/* <div
	className='fixed top-0 left-0 w-full h-full z-20'
	onClick={() => console.log('Desde ModalFormList')}
/> */
}
