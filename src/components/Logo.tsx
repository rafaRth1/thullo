import LogoSVG from '../assets/Logo.svg';

export const Logo = () => {
	return (
		<div className='logo mr-6 cursor-pointer'>
			<img
				src={LogoSVG}
				alt='Logo'
			/>
		</div>
	);
};
