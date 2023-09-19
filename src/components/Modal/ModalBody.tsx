interface Props {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
}

const ModalBody = ({ children, className }: Props) => {
	const classNameValues = className ? className : '';

	return (
		<div
			className={`relative py-3 px-6 ${classNameValues} `}
			data-modal='modal-body'>
			{children}
		</div>
	);
};

export default ModalBody;
