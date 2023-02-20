import { memo } from 'react';
import { InputNameCard, SectionComments, SectionAttachments, SectionDescription } from './';

interface Props {
	formState: any;
	setFormState: any;
	onInputChange: any;
	clearValue: boolean;
	cards: any;
	setCards: any;
}

export const CardColumnOne = memo(
	({ formState, setFormState, onInputChange, clearValue, cards, setCards }: Props) => {
		return (
			<>
				<InputNameCard
					formState={formState}
					onInputChange={onInputChange}
				/>

				<p className='text-xs text-neutral-500'>
					in list In
					<span className='ml-1 text-white'>Progress</span>
				</p>

				<SectionDescription
					formState={formState}
					onInputChange={onInputChange}
				/>

				<SectionAttachments formState={formState} />

				{!!formState?._id && (
					<SectionComments
						formState={formState}
						setFormState={setFormState}
						clearValue={clearValue}
						cards={cards}
						setCards={setCards}
					/>
				)}
			</>
		);
	}
);
