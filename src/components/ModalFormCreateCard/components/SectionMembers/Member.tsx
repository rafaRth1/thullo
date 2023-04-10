import { ImageProfile } from '../../../ImageProfile/ImageProfile';

interface Props {
	member: {
		name: string;
		colorImg: string;
	};
}

export const Member = ({ member }: Props) => {
	return (
		<li className='list-inside-members flex items-center mb-3'>
			<ImageProfile
				name={member.name}
				color={member.colorImg}
			/>
			<p className='flex-1 text-sm text-white'>{member?.name.slice(0, 12).concat('...')}</p>
		</li>
	);
};
