import FormField from './form-fields';
import { TextArea as TextAreaField } from './styles';

interface Props {
	name: string;
	value: string; 
	setValue: (e: string) => void;
}

const TextArea = (props: Props) => {
	const { name, value, setValue } = props;

	return (
		<FormField {...props}>
			<TextAreaField
				{...{ name, value }}
				onChange={({ target: { value } }) => setValue(value)}
			/>
		</FormField>
	);
};

export default TextArea;
