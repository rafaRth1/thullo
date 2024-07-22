import { CSSProperties, forwardRef, RefObject } from 'react';

interface ButtonProps {
	children?: React.ReactNode | React.ReactNode[];
	type?: 'button' | 'submit' | 'reset' | undefined;
	className?: string;
	style?: CSSProperties;
	paddingCustom?: string; // @example with tailwindcss-color px-2 py-2
	colorCustom?: string; // @example with tailwindcss-color bg-color-100
	onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		type,
		children,
		style,
		className,
		onClick,
		colorCustom = 'bg-neutral-700',
		paddingCustom = 'px-2 py-[10px]',
	} = props;

	return (
		<button
			type={type}
			style={style}
			className={`${className} transition-colors rounded-md active:scale-95 text-sm ${colorCustom} ${paddingCustom} `}
			onClick={onClick}
			ref={ref}>
			{children}
		</button>
	);
});
