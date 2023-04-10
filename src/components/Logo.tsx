import LogoSVG from '../assets/Logo.svg';

interface PropsLogo {
	width?: number;
	height?: number;
}

export const Logo = ({ width, height }: PropsLogo) => {
	return (
		<div className='logo mr-6 cursor-pointer'>
			<img
				src={LogoSVG}
				alt='Logo'
				width={width}
				height={height}
			/>
		</div>
	);
};
