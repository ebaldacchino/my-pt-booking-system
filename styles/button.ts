import { Theme } from '@emotion/react';
import { StyledComponent } from '@emotion/styled';
import { ElementType } from 'react';
import tw, { styled } from 'twin.macro';

export enum Variant {
	primary = 'primary',
	secondary = 'secondary',
	danger = 'danger',
	success = 'success',
	textOnly = 'textOnly',
}
interface DefaultStylesProps {
	theme?: Theme | undefined;
	as?: ElementType<any> | undefined;
}

type ButtonProps = StyledComponent<
	{
		theme?: Theme | undefined;
		as?: ElementType<any> | undefined; 
	} & ButtonStyleProps,
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>,
	{}
>;

interface ButtonStyleProps extends DefaultStylesProps {
	variant?: Variant;
}

const buttonBrowserDefaults = `cursor-pointer outline-none transform duration-200 select-none`;

const unstyledLink = styled.a(buttonBrowserDefaults);

const unstyledButton = styled.button(buttonBrowserDefaults);

const defaultButtonStyles = () =>
	tw`flex text-center items-center justify-center px-3 py-1.5 border rounded cursor-pointer w-[fit-content] disabled:cursor-default ${buttonBrowserDefaults}`;

const handleCustomButtonStyles = ({
	variant = Variant.primary,
}: ButtonStyleProps) =>
	variant === Variant.secondary
		? tw`text-blue-500 bg-gray-50 hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 active:border-gray-300`
		: variant === Variant.danger
		? tw`text-red-500 border-transparent hover:underline focus:underline focus:text-red-600 hover:text-red-600 active:text-red-700`
		: variant === Variant.success
		? tw`text-white bg-green-500 border-transparent focus:bg-green-600 hover:bg-green-600 active:bg-green-700`
		: variant === Variant.textOnly
		? tw`text-blue-500 border-transparent hover:underline focus:underline hover:text-blue-600 focus:text-blue-600 active:text-blue-700`
		: variant === Variant.primary &&
		  tw`text-white bg-blue-500 border-transparent hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200`;

const handleNotTextOnly = ({ variant = Variant.primary }: ButtonStyleProps) =>
	variant !== Variant.textOnly &&
	tw`focus:scale-[0.99] focus:hover:shadow-sm active:shadow-md`;

const buttonStyles = () => [
	defaultButtonStyles,
	handleCustomButtonStyles,
	handleNotTextOnly,
];
const Button: ButtonProps = styled.button(buttonStyles);
const LinkButton = styled.a(buttonStyles);

export {
	Button,
	LinkButton,
	buttonBrowserDefaults,
	unstyledLink,
	unstyledButton,
};
