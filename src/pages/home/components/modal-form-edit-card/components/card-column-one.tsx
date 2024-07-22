import { SectionComments, Attachments, Description, NameCard } from '.';

export const CardColumnOne = () => {
	return (
		<div className='card-column-one mr-3 md:w-[480px]'>
			<NameCard />
			<Description />
			<Attachments />
			<SectionComments />
		</div>
	);
};
