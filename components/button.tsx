import tw, { styled } from 'twin.macro';

const buttonBrowserDefaults = `cursor-pointer outline-none transform duration-200 select-none`;

const unstyledLink = tw.a`${buttonBrowserDefaults}`;
const unstyledButton = tw.button`${buttonBrowserDefaults}`;

const defaultButtonStyles = () =>
	tw`flex text-center items-center justify-center px-3 py-1.5 border rounded cursor-pointer disabled:cursor-default ${buttonBrowserDefaults}`;

const handleCustomButtonStyles = ({ secondary, danger, success, textOnly }) =>
	secondary
		? tw`text-blue-500 bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 active:border-gray-300`
		: danger
		? tw`text-red-500 border-transparent hover:underline focus:underline focus:text-red-600 hover:text-red-600 active:text-red-700`
		: success
		? tw`text-white bg-green-500 border-transparent focus:bg-green-600 hover:bg-green-600 active:bg-green-700`
		: textOnly
		? tw`text-blue-500 border-transparent hover:underline focus:underline hover:text-blue-600 focus:text-blue-600 active:text-blue-700`
		: tw`text-white bg-blue-500 border-transparent hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200`;

const handleNotTextOnly = ({ textOnly }) =>
	!textOnly && tw`focus:scale-99 focus:hover:shadow-sm active:shadow-md`;

const Button = styled.button`
	${defaultButtonStyles}
	${handleCustomButtonStyles}
	${handleNotTextOnly}
`;
const LinkButton = styled.a`
	width: fit-content;
	${defaultButtonStyles}
	${handleCustomButtonStyles}
	${handleNotTextOnly}
`;

export {
	Button,
	LinkButton,
	buttonBrowserDefaults,
	unstyledLink,
	unstyledButton,
};
