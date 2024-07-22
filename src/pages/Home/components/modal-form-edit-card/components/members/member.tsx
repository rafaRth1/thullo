import { Avatar } from '@nextui-org/react';

interface Props {
	member: {
		name: string;
		colorImg: string;
	};
}

export const Member = ({ member }: Props) => {
	return (
		<li className='list-inside-members flex items-center py-2'>
			<Avatar
				name={member.name}
				style={{ backgroundColor: member.colorImg }}
				className='mr-2'
			/>
			<p className='text-white flex-1 text-sm font-medium'>{member.name}</p>
		</li>
	);
};
