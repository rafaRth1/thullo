interface Props {
	imageProfile?: string | undefined;
	width?: string | undefined;
	height?: string | undefined;
	style?: string | undefined;
	name?: string;
	color: string;
}

export const ImageProfile = ({ imageProfile, width = '38', height = '38', name, style, color }: Props) => {
	return (
		<div
			className='user-image mr-4'
			style={{ width: `${width}px`, height: `${height}px` }}>
			{!imageProfile ? (
				<div
					className='uppercase p-2 rounded-lg text-sm text-center font-medium text-white'
					style={{ backgroundColor: `${color}` }}>
					<span>{name?.slice(0, 2)}</span>
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
