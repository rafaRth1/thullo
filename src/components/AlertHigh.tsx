import { useProvider } from '../hooks';

interface PropsAlerta {
	alertHigh: {
		msg: string;
		error: boolean;
	};
}

export const AlertHigh = ({ alertHigh }: PropsAlerta) => {
	const { setAlertHigh } = useProvider();

	return (
		<div
			className={`${
				alertHigh.error ? 'bg-red-500' : 'bg-blue-600'
			} rounded-lg text-white text-lg my-5 p-2 text-center font-medium uppercase absolute top-0 right-0 mr-3  transition-opacity ${
				!!alertHigh.msg ? 'opacity-1' : 'opacity-0'
			}`}>
			{alertHigh.msg}
		</div>
	);
};
