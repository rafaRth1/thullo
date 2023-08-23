import { useProvider } from '@hooks/';
import { HeaderContent } from './HeaderContent';

export const Header = () => {
	const { project, projects } = useProvider();

	return (
		<HeaderContent
			project={project}
			projects={projects}
		/>
	);
};
