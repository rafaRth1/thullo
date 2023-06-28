import { CardStateProps } from '../../../interfaces/ListTaskCardTypes';
import { InputNameCard, SectionComments, SectionAttachments, SectionDescription } from './';

interface Props {
	formState: CardStateProps;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setFormState: React.Dispatch<CardStateProps>;
	clearValue: boolean;
}

export const CardColumnOne = ({ formState, setFormState, onInputChange }: Props) => {
	return (
		<>
			<InputNameCard
				formState={formState}
				setFormState={setFormState}
				onInputChange={onInputChange}
			/>

			<p className='text-xs text-neutral-500'>
				in list In
				<span className='ml-1 text-white'>Progress</span>
			</p>

			<SectionDescription
				formState={formState}
				setFormState={setFormState}
				onInputChange={onInputChange}
			/>

			<SectionAttachments formState={formState} />

			{!!formState?._id && (
				<SectionComments
					formState={formState}
					setFormState={setFormState}
				/>
			)}
		</>
	);
};
