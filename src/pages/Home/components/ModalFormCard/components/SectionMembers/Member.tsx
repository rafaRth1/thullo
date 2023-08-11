import { ImageProfile } from '@components/';

interface Props {
	member: {
		name: string;
		colorImg: string;
	};
}

export const Member = ({ member }: Props) => {
	return (
		<li className='list-inside-members flex items-center p-2'>
			<ImageProfile
				name={member.name}
				color={member.colorImg}
				className='mr-2'
			/>
			<p className='text-white flex-1 text-sm font-medium'>{member.name}</p>
		</li>
	);
};
