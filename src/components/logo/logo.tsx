import LogoSVG from '../../assets/Logo.svg';

interface PropsLogo {
	width?: number;
	height?: number;
}

export const Logo = ({ width, height }: PropsLogo): JSX.Element => {
	return (
		<div className='logo cursor-pointer mr-6'>
			<img
				src={LogoSVG}
				alt='Logo'
				style={{ width: `${width}px`, height: `${height}px` }}
				className='max-w-none'
			/>
		</div>
	);
};
