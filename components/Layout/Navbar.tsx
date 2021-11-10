import React from 'react';
import tw from 'twin.macro';
import Link from 'next/link';

const NavbarContainer = tw.header`h-20 flex justify-between items-center bg-blue-700 text-white p-2`;
const Navlinks = tw.nav`flex gap-2`;
const Logo = tw.a`text-5xl font-extrabold font-title`;

export default function Navbar({ user }) {
	const links = [
		{ title: 'Home', url: '/' },
		{ title: 'Book', url: '/book' },
		user
			? { title: 'Logout', url: '/api/auth/logout' }
			: { title: 'Login', url: '/login' },
	];
	return (
		<NavbarContainer>
			<Link href='/' passHref>
				<Logo>EJF</Logo>
			</Link>
			<Navlinks>
				{links.map((link, index) => {
					return (
						<Link key={index} href={link.url} passHref>
							<a>{link.title}</a>
						</Link>
					);
				})}
			</Navlinks>
		</NavbarContainer>
	);
}
