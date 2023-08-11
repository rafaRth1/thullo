import { ReactElement, useEffect } from 'react';
import { useForm, useProvider } from '../../hooks';
import { FormCardContext, ValueLabelTypes } from './FormCardContext';
import { fileUpload } from '@utils/fileUpload';
import clientAxios from '@utils/clientAxios';
import { CardStateProps } from '../../interfaces';

interface Props {
	children: ReactElement;
}

const formData = {
	_id: '',
	nameCard: '',
	imgUlr: '',
	description: '',
	attachments: [],
	comments: [],
	labels: [],
};

const formValidations = {
	// url_image: [(value: string) => value.length >= 6, 'Name de la Imagen es negable'],
	// name_card: [(value: string) => value.length >= 6, 'Name de la carta es negable'],
	// description: [(value) => value.length >= 1, 'Nombre de la descripcion es negable'],
	// comments: [(value) => value.length >= 0, 'Seccion de Comentarios'],
	// attachments: [(value: string) => value.length >= 0, 'Name de los archivos es negable'],
	// labels: [(value) => value.length >= 0, 'Name de los labels es negable'],
};

export const FormCardProvider = ({ children }: Props) => {
	const { formState, setFormState, onInputChange, onResetForm } = useForm<CardStateProps>(
		formData,
		formValidations
	);
	const { project, cardUpdate, lists, setLists, setIsShowModalFormCard } = useProvider();

	const handleDeleteCard = async () => {
		// const listUpdate = lists;
		// const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
		// const columnIndex = listUpdate.indexOf(column);
		// const newColumn = column;

		try {
			const list = lists.find((list) => list._id === cardUpdate.list);
			let listUpdate = list?.taskCards?.filter((taskCard) => taskCard._id !== formState._id);
			const listsUpdate = lists.map((list) => (list._id === list._id ? listUpdate : list)); // FIX

			console.log(listsUpdate);

			// setLists()

			// const { data } = await clientAxios.delete(`/taskCard/${formState._id}`);
			// const taskCardUpdate = newColumn.taskCards.filter((taskCard) => taskCard._id !== formState._id);
			// newColumn.taskCards = [...taskCardUpdate];
			// listUpdate.splice(columnIndex, 1, newColumn);
			// setLists(listUpdate);
			// setIsShowModalFormCard(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditNameCard = async () => {
		if (formState.nameCard === cardUpdate.nameCard || formState._id === '') {
			return;
		} else {
			const listUpdate = lists;
			const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
			const columnIndex = listUpdate.indexOf(column);
			const newColumn = column;

			try {
				const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
					nameCard: formState.nameCard,
				});

				const formStateUpdate = { ...formState };
				formStateUpdate.nameCard = data.nameCard;
				setFormState(formStateUpdate);

				const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
					taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
				);

				newColumn.taskCards = [...taskCardUpdate];
				listUpdate.splice(columnIndex, 1, newColumn);
				setLists(listUpdate);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleEditDescription = async () => {
		if (formState.description === cardUpdate.description) {
			return;
		} else {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				description: formState.description,
			});

			const listUpdate = lists;
			const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
			const columnIndex = listUpdate.indexOf(column);
			const newColumn = column;

			const formStateUpdate = { ...formState };
			formStateUpdate.description = data.description;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		}
	};

	const handleAddLabel = async (
		value: ValueLabelTypes,
		setValue: React.Dispatch<React.SetStateAction<ValueLabelTypes>>
	) => {
		if (!formState._id || value.nameLabel.length <= 2) {
			return;
		}

		const listUpdate = lists;
		const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.indexOf(column);
		const newColumn = column;

		try {
			const { data } = await clientAxios.post(`/taskCard/label/${formState._id}`, {
				nameLabel: value.nameLabel,
				nameColor: value.palet.name,
				color: value.palet.color,
				colorLight: value.palet.colorLight,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.labels = [...formStateUpdate.labels, data];
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
			setValue({
				nameLabel: '',
				palet: {
					name: 'green',
					color: '#16a34a',
					colorLight: '#86efac',
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteLabel = async (id: string) => {
		const listUpdate = lists;
		const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.indexOf(column);
		const newColumn = column;

		try {
			const { data } = await clientAxios.post(`/taskCard/label-delete/${formState._id}`, {
				idLabel: id,
			});

			console.log(data);

			const formStateUpdate = { ...formState };
			formStateUpdate.labels = formStateUpdate.labels.filter(
				(labels: { _id: string }) => labels._id !== id
			);
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelectImage = async (image: any) => {
		const listUpdate = lists;
		const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.indexOf(column);
		const newColumn = column;

		try {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				imgUlr: image.urls.regular,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.imgUlr = data.imgUlr;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteImage = async () => {
		const listUpdate = lists;
		const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.indexOf(column);
		const newColumn = column;

		try {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				imgUlr: '',
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.imgUlr = data.imgUlr;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAssignMember = async (pickMembers: any) => {
		if (!formState._id) {
			return;
		}

		const listUpdate = lists;
		const [column] = listUpdate.filter((list) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.indexOf(column);
		const newColumn = column;

		try {
			const { data } = await clientAxios.post(`/taskCard/member/${formState._id}`, {
				members: pickMembers,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.members = data;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSearchUser = async (
		setValueSearch: React.Dispatch<React.SetStateAction<any[]>>,
		setValue: React.Dispatch<React.SetStateAction<string>>
	) => {
		if (!formState._id) {
			return;
		}

		try {
			const { data } = await clientAxios.get(`/taskCard/member/${project._id}`);
			setValueSearch(data);
			setValue('');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setFormState(cardUpdate);

		return () => {
			onResetForm();
		};
	}, [cardUpdate]);

	return (
		<FormCardContext.Provider
			value={{
				formState,
				setFormState,
				onInputChange,
				onResetForm,
				handleEditNameCard,
				handleEditDescription,
				handleDeleteCard,
				handleAddLabel,
				deleteLabel,
				handleDeleteImage,
				handleSelectImage,
				handleAssignMember,
				handleSearchUser,
			}}>
			{children}
		</FormCardContext.Provider>
	);
};
