import { ReactElement, useEffect } from 'react';
import { useForm, useProvider } from '../../hooks';
import { FormCardContext, ValueLabelTypes } from './FormCardContext';
import { fileUpload } from '../../helpers';
import clientAxios from '../../config/clientAxios';

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
	// description: [(value: any) => value.length >= 1, 'Nombre de la descripcion es negable'],
	// comments: [(value: any) => value.length >= 0, 'Seccion de Comentarios'],
	// attachments: [(value: string) => value.length >= 0, 'Name de los archivos es negable'],
	// labels: [(value: any) => value.length >= 0, 'Name de los labels es negable'],
};

export const FormCardProvider = ({ children }: Props) => {
	const { formState, setFormState, onInputChange, onResetForm } = useForm(formData, formValidations);
	const { project, cardUpdate, lists, setLists, setIsShowModalFormCard } = useProvider();

	const handleDeleteCard = async () => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.delete(`/taskCard/${formState._id}`);

			const taskCardUpdate = newColumn.taskCards.filter((taskCard: any) => taskCard._id !== formState._id);
			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);

			// setCards((cardsPrev: any) => cardsPrev.filter((card: any) => card._id !== formState._id));
			setIsShowModalFormCard(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditNameCard = async () => {
		if (formState.nameCard === cardUpdate.nameCard || formState._id === '') {
			return;
		} else {
			const listUpdate = { ...lists };
			const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
			const columnIndex = listUpdate.lists.indexOf(column);
			const newColumn = { ...column };

			try {
				const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
					nameCard: formState.nameCard,
				});

				const formStateUpdate = { ...formState };
				formStateUpdate.nameCard = data.nameCard;
				setFormState(formStateUpdate);

				const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
					taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
				);

				newColumn.taskCards = [...taskCardUpdate];
				listUpdate.lists.splice(columnIndex, 1, newColumn);
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

			const listUpdate = { ...lists };
			const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
			const columnIndex = listUpdate.lists.indexOf(column);
			const newColumn = { ...column };

			const formStateUpdate = { ...formState };
			formStateUpdate.description = data.description;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		}
	};

	const handleAddLabel = async (
		value: ValueLabelTypes,
		setValue: React.Dispatch<React.SetStateAction<ValueLabelTypes>>
	) => {
		if (value.nameLabel.length <= 2) {
			return;
		}

		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.post(`/taskCard/label/${formState._id}`, {
				nameLabel: value.nameLabel,
				nameColor: value.palet.name,
				color: value.palet.color,
				color_light: value.palet.color_light,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.labels = [...formStateUpdate.labels, data];
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
			setValue({
				nameLabel: '',
				palet: {
					name: 'green',
					color: '#16a34a',
					color_light: '#86efac',
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveAvailable = async (id: string) => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.post(`/taskCard/label-delete/${formState._id}`, {
				idLabel: id,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.labels = formStateUpdate.labels.filter(
				(labels: { _id: string }) => labels._id !== id
			);
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelectImage = async (image: any) => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				imgUlr: image.urls.regular,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.imgUlr = data.imgUlr;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteImage = async () => {
		const listUpdate = { ...lists };
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = { ...column };

		try {
			const { data } = await clientAxios.put(`/taskCard/${formState._id}`, {
				imgUlr: '',
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.imgUlr = data.imgUlr;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAssignMember = async (pickMembers: any) => {
		// const listUpdate = { ...lists };

		const listUpdate = Object.assign({}, lists);
		const [column] = listUpdate.lists.filter((list: any) => list._id === cardUpdate.list);
		const columnIndex = listUpdate.lists.indexOf(column);
		const newColumn = Object.assign({}, column);

		try {
			const { data } = await clientAxios.post(`/taskCard/member/${formState._id}`, {
				members: pickMembers,
			});

			const formStateUpdate = { ...formState };
			formStateUpdate.members = data;
			setFormState(formStateUpdate);

			const taskCardUpdate = newColumn.taskCards.map((taskCard: any) =>
				taskCard._id === formStateUpdate._id ? formStateUpdate : taskCard
			);

			newColumn.taskCards = [...taskCardUpdate];
			listUpdate.lists.splice(columnIndex, 1, newColumn);
			setLists(listUpdate);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSearch = async (
		setValueSearch: React.Dispatch<React.SetStateAction<any[]>>,
		setValue: React.Dispatch<React.SetStateAction<string>>
	) => {
		try {
			const { data } = await clientAxios.get(`/taskCard/member/${project._id}`);
			setValueSearch(data);
			setValue('')
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
				handleRemoveAvailable,
				handleDeleteImage,
				handleSelectImage,
				handleAssignMember,
				handleSearch,
			}}>
			{children}
		</FormCardContext.Provider>
	);
};
