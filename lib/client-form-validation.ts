import * as yup from 'yup';
const email = yup
	.string()
	.email('Must be a valid email address')
	.required('Enter an email address')
	.label('Email');

const password = yup
	.string()
	.min(6, 'Password must be 6+ characters')
	.required('Enter a password')
	.label('Password');

const signUpSchema = yup.object().shape({
	givenName: yup.string().required('Enter first name').label('First name'),
	familyName: yup.string().required('Enter last name').label('Last name'),
	email,
	password,
});

const loginSchema = yup.object().shape({
	email,
	password,
});

interface YupErrors {
	message: string;
	inner: { path: string; message: string }[];
}
const handleErrors = (err: YupErrors) => {
	return err.inner.reduce((object, error) => {
		return { ...object, [error.path]: error.message };
	}, {});
};

interface ObjectShape {
	givenName?: string;
	familyName?: string;
	email: string;
	password: string;
}
const handleValidation = async (
	schema: yup.BaseSchema<ObjectShape>,
	body: ObjectShape
) => {
	try {
		await schema.validate(body, { abortEarly: false });
	} catch (error: any) {
		return handleErrors(error);
	}
	return null;
};

const validateSignup = (body: ObjectShape) =>
	handleValidation(signUpSchema, body);
const validateLogin = (body: ObjectShape) =>
	handleValidation(loginSchema, body);

export { validateSignup, validateLogin };
