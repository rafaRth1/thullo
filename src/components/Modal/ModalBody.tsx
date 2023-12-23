interface Props {
	children: React.ReactNode | React.ReactNode[];
}

const ModalBody = ({ children }: Props) => {
	return (
		<div
			className={`relative flex flex-1 flex-col py-5 px-5 sm:px-6 overflow-y-auto `}
			data-modal='modal-body'>
			{children}
		</div>
	);
};

export default ModalBody;
