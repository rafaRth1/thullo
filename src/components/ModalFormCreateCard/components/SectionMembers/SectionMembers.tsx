import clientAxios from '../../../../config/clientAxios';
import { useEffect, useState } from 'react';
import { IoAddOutline, IoPeopleSharp, IoSearch } from 'react-icons/io5';
import { useProvider } from '../../../../hooks';
import { ImageProfile } from '../../../ImageProfile/ImageProfile';
import { CardStateProps } from '../../../../interfaces/ListTaskCardTypes';
import { LabelPopup } from '../LabelPopup';
import { Member } from './Member';
import './SectionMembers.css';

interface Props {
	formState: CardStateProps;
	setFormState: React.Dispatch<any>;
}

export const SectionMembers = ({ formState, setFormState }: Props) => {
	const [value, setValue] = useState<string>('');
	const [valueSearch, setValueSearch] = useState<any[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const { lists, setLists, cardUpdate, project } = useProvider();
	const [pickMembers, setPickMembers] = useState<any[]>([]);

	const handleSearch = async () => {
		try {
			const { data } = await clientAxios.get(`/taskCard/member/${project._id}`);
			setValueSearch(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAssignMember = async () => {
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
		<div className='mt-2 relative'>
			<LabelPopup
				nameLabel='Members'
				IconLabel={IoPeopleSharp}>
				<div className='list-show-members absolute w-full mt-2 bg-neutral-700 p-2'>
					<ul>
						{formState.members?.map((member) => (
							<Member
								member={member}
								key={member._id}
							/>
						))}
					</ul>

					<button
						type='button'
						className={`add-element-label-content w-full flex items-center text-sm  py-2 px-2 rounded cursor-pointer ${
							isOpen ? 'bg-neutral-800' : ' hover:bg-neutral-600'
						}`}
						onClick={() => {
							setIsOpen(!isOpen);
							handleSearch();
						}}
						disabled={isOpen}>
						<span className='flex-1 text-blue-500'>Assign A Member</span>
						<IoAddOutline color='blue' />
					</button>

					<div
						className={`popup-members bg-neutral-700 absolute mt-5 left-0 flex flex-col rounded-xl p-2 ${
							isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
						}`}
						style={{ width: '240px' }}>
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
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
							/>
							<button
								type='button'
								className='bg-blue-600 p-2 rounded absolute right-0'
								onClick={() => console.log('Filter')}>
								<IoSearch className='text-white text-sm' />
							</button>
						</div>

						<div className='members-all border-neutral-600 border rounded-xl mb-2 p-1'>
							{valueSearch.map((value: any) =>
								formState.members.map((member) => {
									if (value._id === member._id) {
										return;
									} else {
										return (
											<li
												key={value._id}
												className={`list-inside-members flex items-center p-1 cursor-pointer`}
												onClick={(e) => handlePickMember(value, e)}>
												<ImageProfile
													name={value.name}
													color={value.colorImg}
												/>
												<p className='flex-1 text-sm text-white'>
													{value?.name.slice(0, 12).concat('.')}
												</p>
											</li>
										);
									}
								})
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
			</LabelPopup>
		</div>
	);
};
