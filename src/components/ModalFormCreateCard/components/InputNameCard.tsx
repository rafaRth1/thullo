import { InputType } from '../../InputType';
import { IoHandLeftSharp } from 'react-icons/io5';

export const InputNameCard = ({ formState, onInputChange, formValidation, formSubmitted }: any) => {
	return (
		<div className='input-name-card my-5 flex items-center'>
			<IoHandLeftSharp
				size={24}
				className='text-amber-500 mr-5'
			/>

			<InputType
				type='text'
				placeholder='Name card example'
				name={'nameCard'}
				value={formState.nameCard}
				onChange={onInputChange}
				isvalid={formValidation.nameCardValid}
				isvalidform={formSubmitted.toString()}
				className='bg-transparent focus-visible:outline-0'
			/>
		</div>
	);
};
