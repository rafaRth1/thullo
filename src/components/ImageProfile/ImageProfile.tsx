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
	width = '40',
	height = '40',
	name,
	style,
	color,
	className,
}: Props): JSX.Element => {
	return (
		<div
			className={`user-image ${className}`}
			style={{ width: `${width}px`, height: `${height}px` }}>
			{!imageProfile ? (
				<div
					className='flex justify-center items-center uppercase p-2 rounded-md text-sm font-medium text-white h-full'
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
