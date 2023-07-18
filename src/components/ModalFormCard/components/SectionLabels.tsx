import { useState, useContext } from 'react';
import { FormCardContext } from '../../../context';
import { pickColors } from '../../../utils/pickColor';
import Popover from '../../Popover';
import { IoPricetag } from 'react-icons/io5';

export const SectionLabels = () => {
	const { formState, handleAddLabel, deleteLabel } = useContext(FormCardContext);
	const [stateToggle, setStateToggle] = useState(0);
	const [value, setValue] = useState({
		nameLabel: '',
		palet: {
			name: 'green',
			color: '#16a34a',
			colorLight: '#86efac',
		},
	});

	const handleSelectColor = (palet: { name: string; color: string; colorLight: string }, index: number) => {
		setStateToggle(index);
		setValue({ ...value, palet });
	};

	return (
		<div className='mt-2'>
			<Popover preferredPosition='bottom-center'>
				<Popover.Trigger>
					<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2'>
						<span className='pl-2'>
							<IoPricetag className='text-white mr-2 text-xs' />
						</span>
						<span className='text-neutral-200 capitalize text-xs'>Labels</span>
					</div>
				</Popover.Trigger>

				<Popover.Content>
					<div className='popup-labels bg-neutral-700 rounded-xl flex flex-col w-[235px] z-30 p-2 -mt-[3px]'>
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
									style={{ width: '49px', height: '27px', background: `${palet.color}` }}
									className={`palet-colors-item m-1 rounded-lg cursor-pointer ${
										index === stateToggle ? 'active-palet-color' : null
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
								{formState?.labels.map((label: any) => (
									<div
										key={label._id}
										className='all-board inline-flex items-center cursor-pointer rounded-lg py-1 px-3 mr-1 mt-1 text-xs'
										style={{ background: label.colorLight }}
										onClick={() => deleteLabel(label._id)}>
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
							onClick={() => handleAddLabel(value, setValue)}>
							Add
						</button>
					</div>
				</Popover.Content>
			</Popover>
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
