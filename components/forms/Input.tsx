import FormField from './form-fields';
import { Input as InputField } from './styles';
import type { InputProps } from './types';

const Input = (props: InputProps) => {
	const { name, value, type, onChange, error } = props;
	return (
		<>
			<FormField {...props}>
				<InputField {...{ name, value, onChange }} type={type || 'text'} />
			</FormField>
		</>
	);
};

export default Input;
