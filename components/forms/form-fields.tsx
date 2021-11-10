import { BsEye, BsEyeSlash } from 'react-icons/bs';
import {
	FormControl,
	FormFieldContainer,
	Label,
	PlaceHolder,
	IconContainer,
	Error,
} from './styles';

const PasswordEye = ({ type, handleShowPassword }) => (
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
}) => {
	return (
		<FormControl>
			{label && <Label>{label}</Label>}
			<FormFieldContainer error={error} value={value} transparent={transparent}>
				{children}
				{placeHolder && (
					<PlaceHolder
						error={error}
						value={value}
						transparent={transparent}
						htmlFor={name}>
						{placeHolder}
					</PlaceHolder>
				)}
				{name === 'password' && (
					<PasswordEye {...{ handleShowPassword, type }} />
				)}
			</FormFieldContainer>
			{error && <Error>{error}</Error>}
		</FormControl>
	);
};

export default FormField;
