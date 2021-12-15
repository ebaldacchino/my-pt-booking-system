import Head from 'next/head';
import Footer from './Footer';
import tw from 'twin.macro';
import Navbar from './Navbar';
import type { LayoutProps } from './types';

const Main = tw.main`flex flex-col flex-1 items-center justify-center w-full`;
const PageContainer = tw.div`flex flex-col min-h-screen overflow-hidden`;

export default function Layout({
	title,
	description,
	children,
	user,
}: LayoutProps) {
	return (
		<PageContainer>
			<Head>
				<title>
					{title
						? `${title} || EJF`
						: 'EJF || Fitness Solutions That Actually Work'}
				</title>
				<meta
					name='description'
					content={description || 'Default description'}
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navbar {...{ user }} />
			<Main>{children}</Main>
			<Footer />
		</PageContainer>
	);
}
