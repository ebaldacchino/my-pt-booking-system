import tw, { styled, css } from 'twin.macro';

const FormControl = tw.div`mb-3`;
const Label = tw.label`text-base`;
const placeHolderStyles = () => css`
	transform: translate(-0.25rem, -1.35rem) scale(0.77);
`;
const placeHolderBg = (props) =>
	props.transparent ? tw`bg-gray-50` : tw`bg-white`;
const FormFieldContainer = styled.div`
	${tw`relative flex items-center border focus-within:border-2 rounded h-12 mt-2 mb-1`}
	${({ error }) =>
		error ? tw`border-red-500` : tw`focus-within:border-blue-500 `}
	&:focus-within {
		span {
			${({ error }) => (error ? tw`text-red-500` : tw`text-blue-500`)}
			${placeHolderStyles}
			${placeHolderBg}
			${tw`ml-0`}
		}
		input {
			padding-left: calc(0.75rem - 1px);
		}
		.icon-container {
			padding-right: calc(1rem - 1px);
		}
	}
`;
const formFieldStyles = `relative bg-transparent appearance-none rounded focus:outline-none px-3 h-full block w-full`;
const Input = tw.input`${formFieldStyles}`;
const TextArea = tw.textarea`${formFieldStyles}`;
const PlaceHolder = styled.span`
	${tw`block left-2 ml-px px-1 absolute transform transition duration-200 z-0 select-none pointer-events-none origin-top-left`}
	${({ value }) => value && placeHolderBg}
	${({ value }) => value && placeHolderStyles}
	${(props) =>
		(props.error && props.value && tw`text-red-500`) || tw`text-gray-500`}
`;

const IconContainer = tw.div`flex items-center justify-center h-12 pl-2 pr-4 text-lg`;
const Error = tw.small`text-red-500 w-full flex justify-end`;

export {
	FormControl,
	FormFieldContainer,
	Label,
	PlaceHolder,
	Input,
	TextArea,
	IconContainer,
	Error,
};
