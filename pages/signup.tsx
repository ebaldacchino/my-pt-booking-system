import Router from 'next/router';
import { useState } from 'react';
import fetcher from '../lib/fetcher';
import { validateSignup } from '../lib/client-form-validation';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

const Signup = () => {
	const [values, setValues] = useState({
		givenName: '',
		familyName: '',
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
		<Layout title='Create An Account'>
			<AuthForm
				{...{ handleChange, handleSubmit, values, errors, signupPage: true }}
			/>
		</Layout>
	);
};

export default Signup;
