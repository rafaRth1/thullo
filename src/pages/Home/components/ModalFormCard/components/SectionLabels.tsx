import { useState } from 'react';
import { useFormCardProvider } from '@hooks/';
import { pickColors } from '@utils/';
import { useAddLabelTaskCardMutation, useDeleteLabelTaskCardMutation } from '@redux/home/apis';
import { IoPricetag } from 'react-icons/io5';

const label = {
	nameLabel: '',
	palet: {
		name: 'green',
		color: '#16a34a',
		colorLight: '#86efac',
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
			// FIX: Manage error data
			return console.log('Esta vacio');
		}

		const labelValues = {
			nameLabel: value.nameLabel,
			nameColor: value.palet.name,
			color: value.palet.color,
			colorLight: value.palet.colorLight,
		};

		await addLabelTaskCard({ idCard: cardUpdate._id!, labelValues })
			.unwrap()
			.then((response) => setCardUpdate({ ...cardUpdate, labels: [...cardUpdate.labels, response] }))
			.catch((error) => console.log(error));
	};

	const handleEditLabel = async () => {
		console.log('Label Edit');
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

	const handleSelectColor = (palet: { name: string; color: string; colorLight: string }, index: number) => {
		setStateToggle(index);
		setValue({ ...value, palet });
	};

	return (
		<div className='popup-labels bg-neutral-700 rounded-lg flex flex-col w-[240px] z-30 p-2 -mt-[3px]'>
			<div className='header-popup-labels'>
				<span className='text-white text-base font-medium'>Label</span>
				<p className='text-neutral-400 text-sm'>Select a name and a color</p>
			</div>

			<div className='flex relative items-center my-3'>
				<input
					type='text'
					name='label'
					placeholder='Ejm: Design'
					className='w-full p-2 rounded bg-neutral-500 text-white text-xs focus-visible:outline-none capitalize'
					value={value.nameLabel}
					onChange={(e) => setValue({ ...value, nameLabel: e.target.value })}
				/>
			</div>

			<div className='palet-colors flex flex-wrap'>
				{pickColors.map((palet, index) => (
					<div
						key={index}
						style={{ width: '50px', height: '27px', background: `${palet.color}` }}
						className={`palet-colors-item m-1 rounded-lg cursor-pointer ${
							index === stateToggle ? 'border-[2px] border-white border-dashed' : null
						}`}
						onClick={() => handleSelectColor(palet, index)}></div>
				))}
			</div>

			<div className='labels-made mb-3'>
				<div className='text-neutral-300 pl-0 p-1'>
					<IoPricetag
						size={15}
						className='inline-block mr-2'
					/>
					<span className='text-xs'>Available</span>
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

			<button
				type='button'
				className='bg-blue-600 text-white py-1 px-5 rounded-lg text-xs mx-auto'
				onClick={() => handleAddLabel()}>
				Add
			</button>
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
