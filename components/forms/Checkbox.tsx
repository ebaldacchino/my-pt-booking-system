import tw, { styled } from 'twin.macro';
import { CheckboxProps } from './types';

const CheckboxContainer = tw.div`flex items-center mt-2 mb-4`;
const StyledCheckbox = styled.input`
	${tw`appearance-none h-6 w-6 outline-none inline-block align-top relative bg-white m-0 border checked:bg-blue-500 focus:ring-2 duration-200 rounded-lg mr-2 disabled:bg-gray-100`}
	${(props) => !props.disabled && tw`hover:border-blue-500  cursor-pointer`} 
	&::after {
		content: '';
		${tw`block left-0 top-0 absolute transition duration-200`}
	}
	&:checked {
		${(props) => props.disabled && tw`bg-gray-200`}
		&::after {
			${tw`h-3 w-1.5 border-2 border-solid border-white border-t-0 border-l-0 left-2 top-1`}
			transform: rotate(43deg);
		}
	}
`;
const CheckboxLabel = tw.label``;

const Checkbox = ({
	name,
	checked,
	children,
	disabled,
	setChecked,
}: CheckboxProps) => { 
	return (
		<CheckboxContainer>
			<StyledCheckbox
				onChange={() => setChecked(!checked)}
				type='checkbox'
				{...{ name, disabled, checked }}
			/>
			<CheckboxLabel htmlFor={name}>{children}</CheckboxLabel>
		</CheckboxContainer>
	);
};
export default Checkbox;
