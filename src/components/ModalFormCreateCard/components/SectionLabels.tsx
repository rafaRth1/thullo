import { useState, useEffect } from 'react';
import { LabelPopup } from './';
import { IoPricetag } from 'react-icons/io5';

const colors = [
	{
		name: 'green',
		color: '#16a34a',
		color_light: '#86efac',
	},

	{
		name: 'yellow',
		color: '#eab308',
		color_light: '#fde047',
	},

	{
		name: 'orange',
		color: '#f97316',
		color_light: '#fdba74',
	},

	{
		name: 'red',
		color: '#ef4444',
		color_light: '#fca5a5',
	},

	{
		name: 'blue',
		color: '#3b82f6',
		color_light: '#93c5fd',
	},

	{
		name: 'sky',
		color: '#0ea5e9',
		color_light: '#7dd3fc',
	},

	{
		name: 'green-light',
		color: '#4ade80',
		color_light: '#16a34a',
	},

	{
		name: 'slate',
		color: '#64748b',
		color_light: '#475569',
	},

	{
		name: 'gray-light',
		color: '#9ca3af',
		color_light: '#4b5563',
	},
];

export const SectionLabels = ({ formState, setFormState, clearValue }: any) => {
	const [valueSearch, setValueSearch] = useState<any>({
		nameLabel: '',
		palet: {
			name: 'green',
			color: '#16a34a',
		},
	});

	const [stateToggle, setStateToggle] = useState(0);

	// const paletItems = document.querySelectorAll('.palet-colors-item');
	// const paletColor = document.querySelector('.palet-colors');
	// paletItems[0]?.classList.add('active-palet-color');

	// paletItems.forEach((item) => {
	// 	item.addEventListener('click', () => {
	// 		paletColor?.querySelector('.active-palet-color')?.classList.remove('active-palet-color');
	// 		item.classList.add('active-palet-color');
	// 	});
	// });

	const handleSelectColor = (palet: { name: string; color: string }, index: number) => {
		setStateToggle(index);
		setValueSearch({ ...valueSearch, palet });
	};

	const handleAddLabel = () => {
		setFormState((prevState: any) => ({
			...prevState,
			labels: [...prevState.labels, valueSearch],
		}));
	};

	const handleRemoveAvailable = (id: number) => {
		const updateArraLabels = formState.labels.filter((label: any, index: number) => index !== id);
		setFormState((prevState: any) => ({
			...prevState,
			labels: updateArraLabels,
		}));
	};

	useEffect(() => {
		setValueSearch({
			nameLabel: '',
			palet: {
				name: 'green',
				color: '#16a34a',
			},
		});
	}, [clearValue]);

	return (
		<div className='mt-2'>
			<LabelPopup
				nameLabel='Labels'
				IconLabel={IoPricetag}
				clearValue={clearValue}>
				<div
					className='popup-labels absolute mt-2 z-30 bg-neutral-700 rounded-xl p-2 flex flex-col'
					style={{ width: '245px' }}>
					<div className='header-popup-labels'>
						<span className='text-white text-sm'>Label</span>
						<p className='text-neutral-400 text-sm'>Select a name and a color</p>
					</div>

					<div className='image-search flex relative items-center my-3'>
						<input
							type='text'
							placeholder='Label..'
							className='w-full p-2 rounded bg-neutral-500 text-white text-xs focus-visible:outline-none'
							value={valueSearch.nameLabel}
							onChange={(e) => setValueSearch({ ...valueSearch, nameLabel: e.target.value })}
						/>
					</div>

					<div className='palet-colors flex flex-wrap'>
						{colors.map((palet, index) => (
							<div
								key={index}
								style={{ width: '49px', height: '27px', background: `${palet.color}` }}
								className={`palet-colors-item m-1 rounded-lg cursor-pointer ${
									index === stateToggle ? 'active-palet-color' : null
								}`}
								onClick={() => handleSelectColor(palet, index)}></div>
						))}
					</div>

					<div className='labels-made'>
						<div className='text-neutral-300 p-1'>
							<IoPricetag
								size={15}
								className='inline-block mr-2'
							/>
							<span className='text-xs'>Available</span>
						</div>

						{formState?.labels.map((label: any, index: number) => (
							<div
								key={index}
								className={`all-board inline-flex items-center rounded-lg py-1 px-3 mt-1 mx-2 text-xs cursor-pointer h-6`}
								style={{ background: label.palet.color_light }}
								onClick={() => handleRemoveAvailable(index)}>
								<span style={{ color: label.palet.color }}>{label.nameLabel}</span>
							</div>
						))}
					</div>

					<button
						className='bg-blue-600 text-white py-1 px-5 rounded-lg text-xs mx-auto'
						onClick={handleAddLabel}>
						Add
					</button>
				</div>
			</LabelPopup>
		</div>
	);
};
