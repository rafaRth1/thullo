import { useContext } from 'react';
import { ModalContext } from './ModalContext';

interface Props {
	children: (onClose: () => void) => React.ReactNode | React.ReactNode[];
	className?: string;
}

const ModalContent = ({ children, className }: Props) => {
	const { onOpenChange } = useContext(ModalContext);

	return (
		<>
			<div
				className='fixed inset-0 w-screen h-screen'
				onClick={() => onOpenChange()}
				style={{ backgroundColor: 'hsl(0 0% 0%/.5)' }}
			/>

			<div
				className={`relative z-50 ${className ? className : ''}`}
				data-modal='modal-content'>
				{children(onOpenChange)}
			</div>
		</>
	);
};

export default ModalContent;
