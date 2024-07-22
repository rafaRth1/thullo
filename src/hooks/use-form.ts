import { useEffect, useMemo, useState } from 'react';

interface ReturnValuesTyped<T> {
	formState: T;
	setFormState: React.Dispatch<T>;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onResetForm: () => void;
	formValidation: any;
}

export const useForm = <T>(initialForm = {} as T, formValidations: any): ReturnValuesTyped<T> => {
	const [formState, setFormState] = useState<T>(initialForm);
	const [formValidation, setFormValidation] = useState<any>({});

	useEffect(() => {
		craeteValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const isFormValid = useMemo(() => {
		for (const formValue of Object.keys(formValidation)) {
			if (formValidation[formValue] !== null) return false;
		}
		return true;
	}, [formValidation]);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	const craeteValidators = () => {
		const formCheckedValues: any = {};

		for (const formField of Object.keys(formValidations)) {
			const [fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];

			formCheckedValues[`${formField}Valid`] = fn(formState[formField as keyof typeof formState])
				? false
				: true;

			setFormValidation(formCheckedValues);
		}
	};

	return {
		...formState,
		...formValidation,
		formState,
		setFormState,
		onInputChange,
		onResetForm,
		formValidation,
		isFormValid,
	};
};
