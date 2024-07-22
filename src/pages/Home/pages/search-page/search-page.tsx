import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import { projectApi } from '@redux/home/apis';
import { Alerta } from '@components/';

export const SearchPage = () => {
	const { data: projects = [] } = projectApi.endpoints.getProjects.useQuery();
	const [alerta, setAlerta] = useState({ msg: '', error: false });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setAlerta({
			msg: 'Por ahora el buscador no esta disponible',
			error: true,
		});
	};

	const { msg } = alerta;

	return (
		<div className='content-wrapper-search container mx-auto p-4'>
			<h1 className='text-2xl font-medium text-neutral-100 my-5'>Buscar</h1>

			{msg && <Alerta alerta={alerta} />}

			<div>
				<form
					action=''
					onSubmit={(e) => handleSubmit(e)}>
					<Input
						type='text'
						label='Introduzca palabra clave'
					/>
				</form>

				<div className='content-projects flex flex-col gap-3 mt-5'>
					{projects.map((project) => (
						<Link
							to={`/board/${project._id}`}
							key={project._id}
							className='flex items-center p-1 hover:bg-neutral-600 rounded'>
							<img
								src={
									project.name_img
										? project.name_img
										: 'https://i.pinimg.com/originals/85/a3/09/85a309ce4204e643f6ccb4c45d4bce4b.jpg'
								}
								alt='Image Project'
								className='w-14 h-10 rounded'
							/>

							<div className='flex flex-col'>
								<p className='text-neutral-200 ml-3'>{project.name_board}</p>
								<p className='text-neutral-400 ml-3'>Proyecto</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
