import { useContext } from 'react';
import { ModalContext } from './ModalContext';

interface Props {
	children: (onClose: () => void) => React.ReactNode | React.ReactNode[];
	className?: string;
	/**
	 * Choose size
	 * @example 'sm:w-sm md:w-md'
	 */
	size?: string;
}

const ModalContent = ({ children, className, size = 'max-w-md' }: Props) => {
	const { onOpenChange } = useContext(ModalContext);

	return (
		<>
			<div
				className='fixed inset-0 w-screen h-screen'
				onClick={() => onOpenChange()}
				style={{ backgroundColor: 'hsl(0 0% 0%/.5)' }}
			/>

			<section
				className={`flex flex-col bg-neutral-900 rounded-lg relative z-50 w-full ${size} max-h-[calc(100%_-_7.5rem)] m-1`}
				data-modal='modal-content'>
				{children(onOpenChange)}
			</section>
		</>
	);
};

export default ModalContent;
