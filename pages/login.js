import Router from 'next/router';
import { useState } from 'react';
import fetcher from '../lib/fetcher';
import { validateLogin } from '../lib/client-form-validation';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

const Login = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formErrors = await validateLogin(values);
		if (formErrors) return setErrors({ ...formErrors });
		const { res, data } = await fetcher('/api/auth/login', values);
		if (res.ok) {
			setErrors({});
			Router.push('/book');
		} else {
			setErrors(data);
		}
	};
	return (
		<Layout title='Login'>
			<AuthForm {...{ handleChange, handleSubmit, values, errors }} />
		</Layout>
	);
};

export default Login;
