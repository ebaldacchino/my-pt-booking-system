import FormField from './form-fields';
import { TextArea as TextAreaField } from './styles';

interface Props {
	name: string;
	value: string;
	type: string;
	setValue: () => void;
}

const TextArea = (props: Props) => {
	const { name, value, type, setValue } = props;

	return (
		<FormField {...props}>
			<TextAreaField
				name={name}
				value={value}
				type={type || 'text'}
				onChange={({ target: { value } }: {target: {value: string}}) => setValue(value)}
			/>
		</FormField>
	);
};

export default TextArea;
