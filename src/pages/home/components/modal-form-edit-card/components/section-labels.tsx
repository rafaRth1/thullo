import { useState } from 'react';
import { useAddLabelTaskCardMutation, useDeleteLabelTaskCardMutation } from '@redux/home/apis';
import { Button, Input } from '@nextui-org/react';
import { useFormCardProvider } from '@hooks/';
import { colors } from '@utils/';
import { IoPricetag } from 'react-icons/io5';

const label = {
	nameLabel: '',
	palet: {
		name: 'green',
		color: '#16a34a',
		color_light: '#86efac',
	},
};

export const SectionLabels = () => {
	const [value, setValue] = useState(label);
	const [stateToggle, setStateToggle] = useState(0);
	const { cardUpdate, setCardUpdate } = useFormCardProvider();
	const [deleteLabelTaskCard] = useDeleteLabelTaskCardMutation();
	const [addLabelTaskCard] = useAddLabelTaskCardMutation();

	const handleAddLabel = async () => {
		if (value.nameLabel.trim() === '') {
			// FIX: Manage error data Esta vacio
			return;
		}

		const labelValues = {
			nameLabel: value.nameLabel,
			nameColor: value.palet.name,
			color: value.palet.color,
			colorLight: value.palet.color_light,
		};

		await addLabelTaskCard({ idCard: cardUpdate._id!, labelValues })
			.unwrap()
			.then((response) => setCardUpdate({ ...cardUpdate, labels: [...cardUpdate.labels, response] }))
			.catch((error) => console.log(error));
	};

	const handleEditLabel = async () => {
		//console.log('Label Edit');
	};

	const handleDeleteLabel = async (idLabel: string) => {
		deleteLabelTaskCard({ idCard: cardUpdate._id!, idLabel })
			.unwrap()
			.then(() =>
				setCardUpdate({
					...cardUpdate,
					labels: cardUpdate.labels.filter((label) => label._id !== idLabel),
				})
			)
			.catch((error) => console.log(error));
	};

	const handleSelectColor = (color: { name: string; color: string; color_light: string }, index: number) => {
		setStateToggle(index);
		setValue({ ...value, palet: color });
	};

	return (
		<div className='popup-labels flex flex-col z-30 p-3'>
			<div className='header-popup-labels'>
				<p className='font-medium'>Etiquetas</p>
				<p className='text-neutral-400 text-sm'>Seleccionar un nombre y color</p>
			</div>

			<div className='flex relative items-center my-3'>
				<Input
					type='text'
					name='label'
					label='Nombre etiqueta'
					value={value.nameLabel}
					onChange={(e) => setValue({ ...value, nameLabel: e.target.value })}
				/>
			</div>

			<div className='palet-colors grid grid-cols-3 gap-2'>
				{colors.map((color, index) => (
					<div
						key={index}
						style={{ background: `${color.color}` }}
						className={`palet-colors-item rounded-lg cursor-pointer w-full h-[27px] ${
							index === stateToggle ? 'border-[2px] border-white border-dashed opacity-80 transition-all' : ''
						}`}
						onClick={() => handleSelectColor(color, index)}></div>
				))}
			</div>

			<div className='labels-made mb-3'>
				<div className='text-neutral-300 mt-3 pl-0 p-1'>
					<IoPricetag
						size={15}
						className='inline-block mr-2'
					/>
					<p className='text-xs'>Disponibles</p>
				</div>

				<div className='flex flex-wrap mb-1'>
					{cardUpdate.labels.map((label: any) => (
						<div
							key={label._id}
							className='all-board inline-flex items-center cursor-pointer rounded-lg py-1 px-3 mr-1 mt-1 text-xs'
							style={{ background: label.colorLight }}
							onClick={() => handleDeleteLabel(label._id)}>
							<span
								style={{ color: label.color }}
								className='font-medium'>
								{label.nameLabel}
							</span>
						</div>
					))}
				</div>
			</div>

			<Button
				type='button'
				color='primary'
				onClick={() => handleAddLabel()}>
				Agregar
			</Button>
		</div>
	);
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
