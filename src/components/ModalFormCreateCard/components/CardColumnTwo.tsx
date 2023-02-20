import { memo } from 'react';
import { LabelPopup, SectionCovers, SectionLabels } from './';
import { ImageProfile } from '../..';
import { IoAddOutline, IoPeopleSharp, IoPersonCircleOutline, IoSearch } from 'react-icons/io5';
import Image from '../../../assets/PerfilImage.png';
import clientAxios from '../../../config/clientAxios';

export const CardColumnTwo = memo(
	({ formState, setFormState, clearValue, setCards, setIsShowModalCard }: any) => {
		const handleDeleteCard = async () => {
			try {
				const { data } = await clientAxios.delete(`/taskCard/${formState._id}`);
				setCards((cardsPrev: any) => cardsPrev.filter((card: any) => card._id !== formState._id));
				setIsShowModalCard(false);
			} catch (error) {
				console.log(error);
			}
		};

		return (
			<>
				<div className='flex items-center text-neutral-500 text-sm self-end'>
					<IoPersonCircleOutline
						size={17}
						className='mr-3'
					/>
					<span>Actions</span>
				</div>

				<div className='actions-labels'>
					<SectionLabels
						formState={formState}
						setFormState={setFormState}
						clearValue={clearValue}
					/>

					<SectionCovers
						formState={formState}
						setFormState={setFormState}
						clearValue={clearValue}
					/>

					<div className='mt-2 relative'>
						<LabelPopup
							nameLabel='Members'
							IconLabel={IoPeopleSharp}
							clearValue={clearValue}>
							<ul className='list-show-members absolute w-full ml-1 mt-3 bg-neutral-700 p-2'>
								<li className='list-inside-members flex items-center mb-3'>
									<ImageProfile imageProfile={Image} />
									<p className='flex-1 text-sm text-white'>
										{'Daniel Jeesen'.slice(0, 12).concat('.')}
									</p>
								</li>

								<li className='list-inside-members flex items-center mb-3'>
									<ImageProfile imageProfile={Image} />
									<p className='flex-1 text-sm text-white'>
										{'Rafael Alvarez'.slice(0, 12).concat('.')}
									</p>
								</li>

								<div className='add-element-label-content flex items-center text-sm bg-neutral-700 my-4 py-2 px-2 rounded cursor-pointer'>
									<span className='flex-1 text-blue-500'>Assign A Member</span>
									<IoAddOutline color='blue' />
								</div>

								<div
									className='popup-members absolute left-0 flex flex-col  rounded-xl p-2'
									style={{ width: '250px' }}>
									<div className='header-popup-members'>
										<span className='text-white text-sm'>Members</span>
										<p className='text-neutral-400 text-sm'>Assign members to this card</p>
									</div>

									<div className='user-search flex relative items-center my-3'>
										<input
											type='text'
											placeholder='User..'
											className='w-full p-2 rounded bg-neutral-500 text-white text-xs focus-visible:outline-none'
										/>
										<button
											className='bg-blue-600 p-2 rounded absolute right-0'
											onClick={() => console.log('Busando Image')}>
											<IoSearch className='text-white text-sm' />
										</button>
									</div>

									<div className='members-all border-neutral-600 border rounded-xl mb-2 p-1'>
										<div className='flex items-center my-2'>
											<ImageProfile imageProfile={Image} />
											<div className='name-member flex-1 text-white text-sm'>Morris Croft</div>
										</div>

										<div className='flex items-center my-2'>
											<ImageProfile imageProfile={Image} />
											<div className='name-member flex-1 text-white text-sm'>Morris Croft</div>
										</div>
									</div>

									<button className='bg-blue-600 p-2 px-4 text-sm text-white rounded-lg self-center'>
										Invite
									</button>
								</div>
							</ul>
						</LabelPopup>
					</div>

					{!!formState?._id && (
						<div
							className='bg-red-600 hover:bg-red-700 transition-colors rounded p-1 text-center cursor-pointer mt-2'
							onClick={handleDeleteCard}>
							<span className='text-white text-sm'>Delete Card</span>
						</div>
					)}
				</div>
			</>
		);
	}
);
