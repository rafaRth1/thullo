import { useProvider } from '@hooks/';
import { HeaderContent } from './header-content';

export const Header = () => {
	const { project } = useProvider();

	return <HeaderContent project={project} />;
};
