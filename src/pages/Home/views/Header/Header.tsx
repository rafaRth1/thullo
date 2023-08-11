import { useAppSelector, useProvider } from '../../../../hooks';
import { HeaderContent } from './HeaderContent';

export const Header = () => {
	// const {  setProject, setLists, projects } = useProvider();
	const { project } = useAppSelector((state) => state.lists);
	const { projects } = useAppSelector((state) => state.projects);

	return (
		<HeaderContent
			project={project}
			projects={projects}
		/>
	);
};
