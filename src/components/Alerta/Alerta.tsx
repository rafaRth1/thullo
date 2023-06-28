interface PropsAlerta {
	alerta: {
		msg: string;
		error: boolean;
	};
}

export const Alerta = ({ alerta }: PropsAlerta) => {
	return (
		<div
			className={`${
				alerta.error ? 'bg-red-500' : 'bg-blue-500'
			} rounded-lg text-white text-lg my-5 p-2 text-center font-medium uppercase`}>
			{alerta.msg}
		</div>
	);
};
