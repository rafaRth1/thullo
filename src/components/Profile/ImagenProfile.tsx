interface Props {
	imageProfile?: string;
}

export const ImagenProfile = ({ imageProfile }: Props) => {
	return (
		<div className='user-image mr-5'>
			<img
				src={imageProfile}
				alt='Perfil Image'
				className='h-11 w-12 object-cover rounded-xl'
			/>
		</div>
	);
};
