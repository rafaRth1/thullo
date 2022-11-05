interface Props {
	imageProfile?: string;
}

export const ImagenProfile = ({ imageProfile }: Props) => {
	return (
		<div className='user-image mr-5 w-9 h-9'>
			<img
				src={imageProfile}
				alt='Perfil Image'
				className='rounded-xl h-full w-full object-cover'
			/>
		</div>
	);
};
