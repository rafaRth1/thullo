interface Props {
	imageProfile?: string | undefined;
	width?: string | undefined;
	height?: string | undefined;
	style?: string | undefined;
	name?: string;
	color: string;
	className?: string;
}

export const ImageProfile = ({
	imageProfile,
	width = '36',
	height = '36',
	name,
	style,
	color,
	className,
}: Props): JSX.Element => {
	return (
		<div
			className={`user-image ${className} mr-2`}
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
