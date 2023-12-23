import { SectionComments, SectionAttachment, SectionDescription, SectionNameCard } from './';

export const CardColumnOne = () => {
	return (
		<div className='card-column-one mr-3 md:w-[480px]'>
			<SectionNameCard />
			<SectionDescription />
			<SectionAttachment />
			<SectionComments />
		</div>
	);
};
