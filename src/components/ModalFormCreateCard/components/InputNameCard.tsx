interface Props {
	formState: any;
	onInputChange: any;
}

export const InputNameCard = ({ formState, onInputChange }: Props) => {
	return (
		<div className='input-name-card mb-5 flex items-center'>
			<input
				type='text'
				placeholder='Name card example'
				name='nameCard'
				value={formState?.nameCard}
				onChange={onInputChange}
				className='bg-transparent focus-visible:outline-0 flex-1 w-full text-white'
			/>
		</div>
	);
};
