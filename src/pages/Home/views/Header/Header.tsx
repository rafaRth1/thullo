import { useProvider } from '@hooks/';
import { HeaderContent } from './HeaderContent';

export const Header = () => {
	const { project } = useProvider();

	return <HeaderContent project={project} />;
};
