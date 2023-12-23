import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageProfile, Spinner } from '@components/';
import { useFormCardProvider } from '@hooks/useFormCardProvider';
import { usePickImageTaskCardMutation, useSearchMemberQuery } from '@redux/home/apis';
import { Member } from './Member';
import { MemberType } from '@interfaces/';
import { IoSearch } from 'react-icons/io5';
import './SectionMembers.css';

// FIX: Arreglar El component Pop Over al scrollear

export const SectionMembers = () => {
	const [value, setValue] = useState('');
	const [pickMembers, setPickMembers] = useState<MemberType[]>([]);
	const { cardUpdate, setCardUpdate } = useFormCardProvider();
	const { id } = useParams();
	const { data: users = [], isLoading } = useSearchMemberQuery(id!);
	const [pickImageTaskCard] = usePickImageTaskCardMutation();

	const handlePickMember = (
		value: { _id: string; name: string; colorImg: string },
		e: React.MouseEvent<HTMLLIElement, MouseEvent>
	) => {
		if (pickMembers.includes(value)) {
			const picksMembersUpdate = pickMembers.filter((member) => member._id !== value._id);
			setPickMembers(picksMembersUpdate);
			e.currentTarget.classList.remove('rounded-[10px]', 'bg-[rgb(82_82_82)]');
		} else {
			setPickMembers([...pickMembers, value]);
			e.currentTarget.classList.add('rounded-[10px]', 'bg-[rgb(82_82_82)]');
		}
	};

	const handleAssignMember = () => {
		pickImageTaskCard({ idCard: cardUpdate._id!, members: pickMembers })
			.unwrap()
			.then((response) => setCardUpdate({ ...cardUpdate, members: response }))
			.catch((error) => console.log(error));
	};

	return (
		<div className='list-members bg-neutral-700 rounded-md z-30 p-3'>
			<ul>
				{cardUpdate.members?.map((member: any) => (
					<Member
						member={member}
						key={member._id}
					/>
				))}
			</ul>

			<div className='popup-members bg-neutral-700 rounded-xl left-0 flex flex-col'>
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
						className='bg-blue-600 p-[9px] rounded absolute right-0'
						// onClick={() => handleSearchUser(setValueSearch, setValue)}
						onClick={() => console.log('Search user')}>
						<IoSearch className='text-white text-sm' />
					</button>
				</div>

				<div className='members-all mb-2'>
					{isLoading ? (
						<Spinner
							width='30'
							height='30'
						/>
					) : (
						users.map((value) => (
							<li
								key={value._id}
								className={`list-inside-members flex items-center gap-1 p-1 mb-1 cursor-pointer`}
								onClick={(e) => handlePickMember(value, e)}>
								<ImageProfile
									name={value.name}
									color={value.colorImg}
								/>
								<p className='flex-1 text-sm text-white'>{value?.name}</p>
							</li>
						))
					)}
				</div>

				<button
					type='button'
					className='bg-blue-600 p-2 px-4 text-sm text-white rounded-lg self-center'
					onClick={handleAssignMember}>
					Invite
				</button>
			</div>
		</div>
	);
};
