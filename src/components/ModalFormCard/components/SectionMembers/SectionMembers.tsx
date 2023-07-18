import { useContext, useState } from 'react';
import { FormCardContext } from '../../../../context';
import Popover from '../../../Popover';
import { ImageProfile } from '../../../ImageProfile/ImageProfile';
import { Member } from './Member';
import { IoPeopleSharp, IoSearch } from 'react-icons/io5';
import './SectionMembers.css';

// FIX: Arreglar El component Pop Over al scrollear

export const SectionMembers = () => {
	const { formState, handleAssignMember, handleSearch } = useContext(FormCardContext);
	const [value, setValue] = useState('');
	const [valueSearch, setValueSearch] = useState<any[]>([]);
	const [pickMembers, setPickMembers] = useState<any[]>([]);

	const handlePickMember = (
		value: { _id: string; name: string; colorImg: string },
		e: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		if (pickMembers.includes(value)) {
			const picksMembersUpdate = pickMembers.filter((member) => member._id !== value._id);
			setPickMembers(picksMembersUpdate);
			e.currentTarget.classList.remove('active-member');
		} else {
			setPickMembers([...pickMembers, value]);
			e.currentTarget.classList.add('active-member');
		}
	};

	return (
		<div className='mt-2'>
			<Popover preferredPosition='bottom-center'>
				<Popover.Trigger>
					<div className='bg-neutral-700 rounded cursor-pointer flex items-center p-2'>
						<span className='pl-2'>
							<IoPeopleSharp className='text-white mr-2 text-xs' />
						</span>
						<span className='text-neutral-200 capitalize text-xs'>Members</span>
					</div>
				</Popover.Trigger>

				<Popover.Content>
					<div className='list-members bg-neutral-700 rounded-xl w-[235px] z-30 -mt-[3px]'>
						<ul className='pt-2'>
							{formState.members?.map((member: any) => (
								<Member
									member={member}
									key={member._id}
								/>
							))}
						</ul>

						<div className='popup-members bg-neutral-700 rounded-xl left-0 flex flex-col p-2'>
							<div className='header-popup-members'>
								<span className='text-white text-sm'>Members</span>
								<p className='text-neutral-400 text-sm'>Assign members to this card</p>
							</div>

							<div className='user-search flex relative items-center my-3'>
								<input
									type='text'
									placeholder='User..'
									className='w-full p-2 rounded bg-neutral-500 text-white text-xs focus-visible:outline-none'
									value={value}
									onChange={(e) => setValue(e.target.value)}
								/>
								<button
									type='button'
									className='bg-blue-600 p-2 rounded absolute right-0'
									onClick={() => handleSearch(setValueSearch, setValue)}>
									<IoSearch className='text-white text-sm' />
								</button>
							</div>

							<div className='members-all border-neutral-600 border rounded-xl mb-2 p-1'>
								{valueSearch.map((value: any) => (
									<li
										key={value._id}
										className={`list-inside-members flex items-center p-1 cursor-pointer`}
										onClick={(e) => handlePickMember(value, e)}>
										<ImageProfile
											name={value.name}
											color={value.colorImg}
											className='mr-2'
										/>
										<p className='flex-1 text-sm text-white'>
											{value?.name.slice(0, 12).concat('.')}
										</p>
									</li>
								))}
							</div>

							<button
								type='button'
								className='bg-blue-600 p-2 px-4 text-sm text-white rounded-lg self-center'
								onClick={() => handleAssignMember(pickMembers)}>
								Invite
							</button>
						</div>
					</div>
				</Popover.Content>
			</Popover>
		</div>
	);
};
