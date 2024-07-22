import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useBoardProvider } from '@hooks/';
import { useAddListMutation, useEditListMutation } from '@redux/home/apis';
import { colorsGradients } from '@utils/pick-color';

interface Props {
	isOpenFormList: boolean;
	onOpenChangeFormList: () => void;
}

export const ModalFormList = ({ isOpenFormList, onOpenChangeFormList }: Props) => {
	const [nameList, setNameList] = useState('');
	const { listCurrent, setListCurrent, listsArray } = useBoardProvider();
	const [addList] = useAddListMutation();
	const [editList] = useEditListMutation();
	const { id } = useParams();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (nameList.length <= 4) return;

		if (listCurrent._id) {
			await handleEditList();
			onOpenChangeFormList();
		} else {
			await handleAddList();
			onOpenChangeFormList();
		}
	};

	const handleAddList = async () => {
		try {
			await addList({
				name: nameList,
				project: id,
				color_header: pickColor(),
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

	const pickColor = () => {
		const color = Math.floor(Math.random() * colorsGradients.length);

		console.log(color);

		return colorsGradients[color];
	};

	useEffect(() => {
		const [listSelected] = listsArray.filter((list) => list._id === listCurrent._id);

		if (listSelected?.name !== undefined) {
			setNameList(listSelected.name);
		}

		return () => {
			setNameList('');
		};
	}, [isOpenFormList]);

	return (
		<Modal
			isOpen={isOpenFormList}
			onOpenChange={onOpenChangeFormList}
			className='bg-neutral-900'>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader>Formulario lista</ModalHeader>
						<ModalBody>
							<form
								onSubmit={(e) => handleSubmit(e)}
								className='flex flex-col'>
								<Input
									type='text'
									name='name-list'
									label='Nombre lista'
									className='mb-5'
									value={nameList}
									onValueChange={setNameList}
								/>

								<Button
									color='primary'
									type='submit'>
									{!listCurrent._id ? 'Crear lista' : 'Actualizar lista'}
								</Button>
							</form>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='light'
								onPress={onClose}>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
