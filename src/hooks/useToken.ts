import { AxiosRequestConfig } from 'axios';

export const useToken = (controller: AbortController, extraConfig?: any) => {
	const token = localStorage.getItem('token');

	const config: AxiosRequestConfig = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},

		signal: controller.signal,

		...extraConfig,
	};

	return { config };
};
