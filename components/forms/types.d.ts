import type { Theme } from '@emotion/react';
export interface PasswordEyeProps {
	type: 'text' | 'password';
	handleShowPassword: () => void;
}

export interface FormFieldProps {
	value: string;
	label?: string;
	placeHolder?: string;
	name: string;
	transparent?: boolean;
	error?: string;
	children: JSX.Element | JSX.Element[];
	type?: string;
	handleShowPassword?: () => void;
}

export interface InputProps extends FormFieldProps {
	onChange: () => void;
}

export interface StyleProps {
	theme?: Theme | undefined;
}

export interface PlaceHolderStyleProps extends StyleProps {
	error?: boolean;
	value?: string;
	transparent?: boolean;
	as?: React.ElementType<any> | undefined;
}

export interface CheckboxProps {
	name: string;
	checked: boolean;
	children: JSX.Element;
	disabled: boolean;
	setChecked: (e: boolean) => void;
}
