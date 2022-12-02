import { InputType } from '../../InputType';
import { IoHandLeftSharp } from 'react-icons/io5';

interface Props {
	formState: any;
	onInputChange: any;
	formValidation: any;
	formSubmitted: any;
	cardUpdate: {
		id: number;
		name_card: string;
		attachments: never[];
		comments: never[];
		description: string;
		url_image: string;
	};
}

export const InputNameCard = ({ formState, onInputChange, formValidation, formSubmitted }: Props) => {
	return (
		<div className='input-name-card my-5 flex items-center'>
			<IoHandLeftSharp
				size={24}
				className='text-amber-500 mr-5'
			/>

			<InputType
				type='text'
				placeholder='Name card example'
				name='name_card'
				value={formState.name_card}
				onChange={onInputChange}
				isvalid={formValidation.nameCardValid}
				isvalidform={formSubmitted.toString()}
				className='bg-transparent focus-visible:outline-0 flex-1 w-full'
			/>
		</div>
	);
};
