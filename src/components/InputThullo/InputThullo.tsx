import { useEffect, useMemo, useState } from 'react';

interface Props {
	id?: string;
	name?: string;
	autocomplete?: string;
	placeholder?: string;
	value: string;
	label?: string;
	className?: string;
	type?: React.HTMLInputTypeAttribute;
	isvalid?: string;
	isvalidform?: string;
	onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputThullo = ({
	className,
	type,
	value,
	autocomplete = '',
	id,
	name,
	placeholder = 'Write Value',
	onChangeValue,
	isvalid,
	isvalidform,
}: Props) => {
	return (
		<input
			className={`text-white bg-neutral-700 focus-visible:outline-none rounded-lg transition-colors border-2 w-full px-2 py-3 mb-6 text-sm ${
				!!isvalid && isvalidform === 'true'
					? 'border-[#f21261] placeholder:text-[#f21261]'
					: `border-neutral-400 placeholder:text-neutral-400`
			} ${className ? className : ''}`}
			type={type}
			name={name}
			placeholder={placeholder}
			id={id}
			autoComplete={autocomplete}
			value={value}
			onChange={onChangeValue}
		/>
	);
};
