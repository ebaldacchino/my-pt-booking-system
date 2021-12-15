export interface NavbarProps {
	user: string | undefined;
}

export interface LayoutProps extends NavbarProps {
	title: string;
	description: string;
	children: JSX.Element | JSX.Element[];
}
