import type { Theme } from '@emotion/react';
import { StyledComponent } from '@emotion/styled';
import { ButtonHTMLAttributes, ClassAttributes } from 'react';
import tw, { styled } from 'twin.macro';
import { unstyledButton } from '../styles/button';

interface StylesProps {
	theme?: Theme | undefined;
}

interface ListContainerProps extends StylesProps {
	noBorder?: true | undefined;
	column?: true | undefined;
}

interface ListItemButtonProps extends StylesProps {
	blue?: boolean;
	icon?: boolean;
	dontFill?: boolean;
}

const ListContainer = styled.ul`
	${tw`flex`}
	${(props: ListContainerProps) =>
		props.noBorder
			? tw`divide-none`
			: tw`divide-gray-200 border-t border-b border-gray-200`}
	${({ column }: ListContainerProps) => (column ? tw`divide-y` : tw`divide-x`)}
`;
const ListItem = tw.li`flex flex-1`;

const ListItemButton: StyledComponent<
	ClassAttributes<HTMLButtonElement> &
		ButtonHTMLAttributes<HTMLButtonElement> &
		ListItemButtonProps,
	{},
	{}
> = styled(unstyledButton)`
	${tw`flex justify-center items-center  font-semibold py-3.5`}
	${({ dontFill }: ListItemButtonProps) => !dontFill && tw`flex-1`}
	${({ icon }: ListItemButtonProps) => (icon ? tw`text-2xl` : tw`text-sm`)}
	${({ blue }: ListItemButtonProps) =>
		blue &&
		tw`text-blue-500 hover:text-blue-600 focus:text-blue-600 active:text-blue-700`}
		${({ disabled }: any) =>
		disabled
			? tw`text-gray-200 cursor-default`
			: tw`focus:bg-gray-100 hover:bg-gray-100 active:bg-gray-200 active:shadow-inner focus:shadow-inner`}
`;

export { ListContainer, ListItem, ListItemButton };
