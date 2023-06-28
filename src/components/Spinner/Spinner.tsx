import './Spinner.css';

interface Props {
	className?: string;
}

export const Spinner = ({ className }: Props) => {
	return (
		<div className={`flex justify-center items-center ${className}`}>
			<span className='loader block'></span>
		</div>
	);
};
