interface Props {
	imageProfile?: string;
	width?: string;
	height?: string;
	style?: string;
	name?: string;
}

export const ImageProfile = ({ imageProfile, width = '36', height = '36', name, style }: Props) => {
	return (
		<div
			className='user-image mr-4'
			style={{ width: `${width}px`, height: `${height}px` }}>
			{name ? (
				<div className='uppercase bg-neutral-500 p-2 rounded-3xl text-sm text-center font-medium'>
					<span>{name.slice(0, 2)}</span>
				</div>
			) : (
				<img
					src={imageProfile}
					alt='Perfil Image'
					className={`rounded-lg ${style}`}
				/>
			)}
		</div>
	);
};
