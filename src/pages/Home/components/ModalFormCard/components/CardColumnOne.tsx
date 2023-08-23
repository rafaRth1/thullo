import { SectionComments, SectionAttachment, SectionDescription, SectionNameCard } from './';

export const CardColumnOne = () => {
	return (
		<div className='card-column-one mr-3'>
			<SectionNameCard />

			<p className='text-sm text-neutral-300'>
				in list In
				<span className='ml-1 text-white'>Progress</span>
			</p>

			<SectionDescription />
			<SectionAttachment />
			<SectionComments />
		</div>
	);
};
