import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Button, Input } from '@nextui-org/react';
import { usePickImageTaskCardMutation, useSearchMemberQuery } from '@redux/home/apis';
import { Spinner } from '@components/';
import { useFormCardProvider } from '@hooks/';
import { Member } from './member';
import { MemberType } from '@interfaces/';
import { IoSearch } from 'react-icons/io5';

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
		<div className='list-members z-30 p-3'>
			<ul>
				{cardUpdate.members?.map((member: any) => (
					<Member
						member={member}
						key={member._id}
					/>
				))}
			</ul>

			<div className='popup-members rounded-xl left-0 flex flex-col'>
				<div className='header-popup-members'>
					<p>Miembros</p>
					<p className='text-neutral-400 text-sm'>Asignar miembros a esta tarea</p>
				</div>

				<div className='relative flex flex-col items-center my-3'>
					<Input
						type='text'
						label='Usuario'
						className='mb-4'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>

					<Button
						type='button'
						color='primary'
						className='w-full'
						// onClick={() => handleSearchUser(setValueSearch, setValue)}
						onClick={() => console.log('Search user')}>
						<IoSearch className='text-white text-sm' />
					</Button>
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
								<Avatar
									name={value.name}
									style={{ backgroundColor: value.colorImg }}
									radius='sm'
								/>

								<p className='flex-1 ml-2 text-sm'>{value?.name}</p>
							</li>
						))
					)}
				</div>

				<Button
					type='button'
					color='primary'
					onClick={handleAssignMember}>
					Invitar
				</Button>
			</div>
		</div>
	);
};
