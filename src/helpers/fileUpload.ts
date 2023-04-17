import clientAxios from '../config/clientAxios';

export const fileUpload = async (file: File) => {
	const cloudUrl = 'https://api.cloudinary.com/v1_1/dork20pxe/upload';

	const formData = new FormData();
	formData.append('upload_preset', 'trullo-trello-clone');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});

		if (!resp.ok) throw new Error('No se pudo subir la imagen');

		const cloudResponse = await resp.json();
		const { data } = await clientAxios.post(`/projects/image`, {
			publicId: cloudResponse.public_id,
			url: cloudResponse.url,
			createdAt: cloudResponse.created_at,
			resourceType: cloudResponse.resource_type,
		});

		return cloudResponse;
	} catch (error: any) {
		console.log(error);
		throw new Error(error.message);
	}
};
