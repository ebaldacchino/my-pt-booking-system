import FormField from './form-fields';
import { TextArea as TextAreaField } from './styles';

const TextArea = (props) => {
	const { name, value, type, setValue } = props;

	return (
		<FormField {...props}>
			<TextAreaField
				name={name}
				value={value}
				type={type || 'text'}
				onChange={(e) => setValue(e.target.value)}
			/>
		</FormField>
	);
};

export default TextArea;
