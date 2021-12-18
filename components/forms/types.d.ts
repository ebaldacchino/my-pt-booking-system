import type { jsx, Theme } from '@emotion/react';
import { StyledComponent } from '@emotion/styled';
import React, { ComponentProps } from 'react';

export interface PasswordEyeProps extends ComponentProps {
	type: 'text' | 'password';
	handleShowPassword: () => void;
}

export interface FormFieldProps extends ComponentProps {
	value: string;
	label?: string;
	placeHolder?: string;
	name?: string;
	children?: JSX.Element | JSX.Element[];
	transparent?: boolean;
	error?: string;
	type?: string;
	handleShowPassword?: () => void;
}

export interface InputProps extends FormFieldProps {
	onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface PlaceHolderStyleProps extends ComponentProps { 
	error?: string;
	value?: string;
	transparent?: boolean;
}

export interface CheckboxProps {
	name: string;
	checked: boolean;
	children: JSX.Element;
	disabled: boolean;
	setChecked: (e: boolean) => void;
}
