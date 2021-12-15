import { BsEye, BsEyeSlash } from 'react-icons/bs';
import {
	FormControl,
	FormFieldContainer,
	Label,
	PlaceHolder,
	IconContainer,
	Error,
} from './styles';
import type { FormFieldProps, PasswordEyeProps } from './types';

const PasswordEye = ({
	type = 'password',
	handleShowPassword,
}: PasswordEyeProps) => (
	<IconContainer onClick={handleShowPassword} className='icon-container'>
		{type === 'password' ? <BsEyeSlash /> : <BsEye />}
	</IconContainer>
);
const FormField = ({
	value,
	type,
	label,
	placeHolder,
	name,
	transparent,
	children,
	handleShowPassword,
	error,
}: FormFieldProps) => {
	return (
		<FormControl>
			{label && <Label>{label}</Label>}
			<FormFieldContainer {...{ error, value, transparent }}>
				{children}
				{placeHolder && (
					<PlaceHolder {...{ error, value, transparent }}>
						{placeHolder}
					</PlaceHolder>
				)}
				{name === 'password' &&
					handleShowPassword &&
					(type === 'text' || type === 'password') && (
						<PasswordEye {...{ handleShowPassword, type }} />
					)}
			</FormFieldContainer>
			{error && <Error>{error}</Error>}
		</FormControl>
	);
};

export default FormField;
