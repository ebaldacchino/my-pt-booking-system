import FormField from './form-fields';
import { Input as InputField } from './styles';

const Input = (props) => {
	const { name, value, type, onChange, error } = props;
	return (
		<>
			<FormField {...props}>
				<InputField
					name={name}
					value={value}
					type={type || 'text'}
					onChange={onChange}
				/>
			</FormField>
		</>
	);
};

export default Input;
