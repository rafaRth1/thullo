export const useToken = (extraConfig?: any) => {
	const token = localStorage.getItem('token');

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},

		...extraConfig,
	};

	return config;
};
