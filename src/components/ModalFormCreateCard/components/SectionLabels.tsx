import clientAxios from '../../../config/clientAxios';
import { useState } from 'react';
import { LabelPopup } from './';
import { pickColors } from '../../../utils/pickColor';
import { IoPricetag } from 'react-icons/io5';
import { useProvider } from '../../../hooks';

export const SectionLabels = ({ formState, setFormState }: any) => {
	const [stateToggle, setStateToggle] = useState(0);
	const { lists, setLists, cardUpdate } = useProvider();
	const [value, setValue] = useState({
		nameLabel: '',
		palet: {
			name: 'green',
			color: '#16a34a',
			color_light: '#86efac',
		},
	});

	const handleSelectColor = (palet: { name: string; color: string; color_light: string }, index: number) => {
		setStateToggle(index);
		setValue({ ...value, palet });
	};

	const handleAddLabel = async () => {
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

	// useEffect(() => {
	// 	const paletItems = document.querySelectorAll('.palet-colors-item');
	// 	const paletColor = document.querySelector('.palet-colors');

	// 	paletItems.forEach((item) => {
	// 		item.addEventListener('click', () => {
	// 			paletColor?.querySelector('.active-palet-color')?.classList.remove('active-palet-color');
	// 			item.classList.add('active-palet-color');
	// 		});
	// 	});

	// 	return () => {
	// 		paletItems[0]?.classList.remove('active-palet-color');
	// 	};
	// }, []);

	return (
		<div className='mt-2'>
			<LabelPopup
				nameLabel='Labels'
				IconLabel={IoPricetag}>
				<div
					className='popup-labels absolute mt-2 z-30 bg-neutral-700 rounded-xl p-2 flex flex-col'
					style={{ width: '245px' }}>
					<div className='header-popup-labels'>
						<span className='text-white text-sm'>Label</span>
						<p className='text-neutral-400 text-sm'>Select a name and a color</p>
					</div>

					<div className='image-search flex relative items-center my-3'>
						<label htmlFor='label'>
							<input
								type='text'
								name='label'
								placeholder='Ejm: Design'
								className='w-full p-2 rounded bg-neutral-500 text-white text-xs focus-visible:outline-none capitalize'
								value={value.nameLabel}
								onChange={(e) => setValue({ ...value, nameLabel: e.target.value })}
							/>
						</label>
					</div>

					<div className='palet-colors flex flex-wrap'>
						{pickColors.map((palet, index) => (
							<div
								key={index}
								style={{ width: '49px', height: '27px', background: `${palet.color}` }}
								className={`palet-colors-item m-1 rounded-lg cursor-pointer ${
									index === stateToggle ? 'active-palet-color' : null
								}`}
								onClick={() => handleSelectColor(palet, index)}></div>
						))}
					</div>

					<div className='labels-made mb-3'>
						<div className='text-neutral-300 p-1'>
							<IoPricetag
								size={15}
								className='inline-block mr-2'
							/>
							<span className='text-xs'>Available</span>
						</div>

						{formState?.labels.map((label: any) => (
							<div
								key={label._id}
								className={`all-board inline-flex items-center rounded-lg py-1 px-3 mt-1 mx-2 text-xs cursor-pointer h-6`}
								style={{ background: label.color_light }}
								onClick={() => handleRemoveAvailable(label._id)}>
								<span style={{ color: label.color }}>{label.nameLabel}</span>
							</div>
						))}
					</div>

					<button
						type='button'
						className='bg-blue-600 text-white py-1 px-5 rounded-lg text-xs mx-auto'
						onClick={handleAddLabel}>
						Add
					</button>
				</div>
			</LabelPopup>
		</div>
	);
};
