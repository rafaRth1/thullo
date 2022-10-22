interface Props {
	imageProfile?: string;
}

export const ImagenProfile = ({ imageProfile }: Props) => {
	return (
		<div className='user-image mr-5 w-11 h-11'>
			<img
				src={imageProfile}
				alt='Perfil Image'
				className='rounded-xl'
			/>
		</div>
	);
};
