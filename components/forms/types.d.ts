import type { Theme } from '@emotion/react';
import React, { ComponentProps } from 'react';
export interface PasswordEyeProps {
	type: 'text' | 'password';
	handleShowPassword: () => void;
}

export interface FormFieldProps extends ComponentProps {
	value: string;
	label?: string;
	placeHolder?: string;
	name?: string;
	transparent?: boolean;
	error?: string; 
	type?: string;
	handleShowPassword?: (e) => void;
}

export interface InputProps extends FormFieldProps {
	onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface PlaceHolderStyleProps extends ComponentProps {
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
