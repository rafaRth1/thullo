import { CSSProperties, useState } from 'react';

interface Props {
	src: string;
	className?: string;
	style?: CSSProperties;
	alt?: string;
}

// https://i.pinimg.com/originals/85/a3/09/85a309ce4204e643f6ccb4c45d4bce4b.jpg

export const OverlayImage = ({ src, className, style, alt }: Props) => {
	const [load, setLoad] = useState(true);

	const onLoad = () => {
		setLoad(false);
	};

	return (
		<>
			<img
				src={src}
				className={className}
				style={style}
				alt={alt}
				onLoad={onLoad}
			/>

			{load && (
				<div className='overlay-image absolute bg-neutral-700 h-full w-full top-0 rounded-md'></div>
			)}
		</>
	);
};
