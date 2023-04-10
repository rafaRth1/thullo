import { Board, SubHeader } from '../views';

export const BoardContainer = (): JSX.Element => {
	return (
		<div className='flex flex-col flex-1'>
			<SubHeader />
			<Board />
		</div>
	);
};
