import React from 'react';
import Link from 'next/link';
import { Form, Input, Button, LinkButton, A, Err } from '../styles';

interface FormData {
	email: string;
	password: string;
	givenName: string;
	familyName: string;
}

export default function AuthForm({
	values,
	handleChange,
	handleSubmit,
	errors,
	signupPage,
}: {
	values: FormData;
	handleChange: any;
	handleSubmit: any;
	errors: FormData;
	signupPage: true | undefined;
}) {
	return (
		<Form onSubmit={handleSubmit}>
			{signupPage && (
				<>
					<Input
						type='givenName'
						placeholder='Given Name'
						name='givenName'
						value={values.givenName}
						onChange={handleChange}
					/>
					{errors.givenName && <Err>{errors.givenName}</Err>}
					<Input
						type='familyName'
						placeholder='Family Name'
						name='familyName'
						value={values.familyName}
						onChange={handleChange}
					/>
					{errors.familyName && <Err>{errors.familyName}</Err>}
				</>
			)}
			<Input
				type='email'
				name='email'
				placeholder='Email'
				value={values.email}
				onChange={handleChange}
			/>
			{errors.email && <Err>{errors.email}</Err>}
			<Input
				type='password'
				name='password'
				placeholder='Password'
				value={values.password}
				onChange={handleChange}
			/>
			{errors.password && <Err>{errors.password}</Err>}
			<Button type='submit'>{signupPage ? 'Create Account' : 'Login'} </Button>
			<Link
				href='https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/api/auth/google&client_id=726118344896-2q2vruiuqvs5t1u1dr8f077o4rtq0urn.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email'
				passHref>
				<LinkButton>{signupPage ? 'Signup' : 'Login'} with Google</LinkButton>
			</Link>
			{signupPage ? (
				<Link href='/login' passHref>
					<A>Already signed up? Login</A>
				</Link>
			) : (
				<Link href='/signup' passHref>
					<A>Not registered? Signup</A>
				</Link>
			)}
		</Form>
	);
}
