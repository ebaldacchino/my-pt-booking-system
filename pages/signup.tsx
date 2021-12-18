import Router from 'next/router';
import React, { useState } from 'react';
import fetcher from '../lib/fetcher';
import { validateSignup } from '../lib/client-form-validation';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

interface DefaultValues {
	givenName: string;
	familyName: string;
	email: string;
	password: string;
}
interface DefaultErrors {
	givenName?: string;
	familyName?: string;
	email?: string;
	password?: string;
}
const defaultValues = {
	givenName: '',
	familyName: '',
	email: '',
	password: '',
};

const Signup = () => {
	const [values, setValues] = useState<DefaultValues>(defaultValues);
	const [errors, setErrors] = useState<DefaultErrors>({});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const formErrors = await validateSignup(values);
		if (formErrors) return setErrors(formErrors);
		const { res, data } = await fetcher('/api/auth/signup', values);
		if (res.ok) {
			setErrors({});
			Router.push('/book');
		} else {
			setErrors(data);
		}
	};
	return (
		<Layout
			title='Create An Account'
			description='Signup page'
			user={undefined}>
			<AuthForm
				{...{ handleChange, handleSubmit, values, errors, signupPage: true }}
			/>
		</Layout>
	);
};

export default Signup;
