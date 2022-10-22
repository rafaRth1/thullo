import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations: any) => {
	const [formState, setFormState] = useState<any>(initialForm);
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

	const onInputChange = ({ target }: any) => {
		const { name, value } = target;

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

			formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;

			setFormValidation(formCheckedValues);
		}
	};

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		formValidation,
		isFormValid,
	};
};
