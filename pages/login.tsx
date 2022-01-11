import Router from 'next/router';
import React, { useState } from 'react';
import fetcher from '../lib/fetcher';
import { validateLogin } from '../lib/client-form-validation';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

interface DefaultValues {
	email: string;
	password: string;
}
interface DefaultErrors {
	email?: string;
	password?: string;
}
const defaultValues = {
	email: '',
	password: '',
};
const Login = () => {
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
		const formErrors = await validateLogin(values);
		if (formErrors) {
			return setErrors(formErrors);
		}
		const { res, data } = await fetcher('/api/auth/login', {
			body: values,
			method: 'POST',
		});
		if (res.ok) {
			setErrors({});
			Router.push('/book');
		} else {
			setErrors(data);
		}
	};

	return (
		<Layout title='Login Here' description='Welcome' user=''>
			<AuthForm {...{ handleChange, handleSubmit, values, errors }} />
		</Layout>
	);
};

export default Login;
