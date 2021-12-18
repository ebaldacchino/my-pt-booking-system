// Handled type errors with :
// https://github.com/jquense/yup/blob/master/docs/typescript.md
import * as yup from 'yup';
import type {
	LoginSchema,
	SignupSchema,
	LoginProps,
	SignupProps,
	ClientSideFormValidationErrors,
	AuthFormProps,
	AuthFormSchema,
} from './types';

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

const signUpSchema: SignupSchema = yup.object().shape({
	givenName: yup.string().required('Enter first name').label('First name'),
	familyName: yup.string().required('Enter last name').label('Last name'),
	email,
	password,
});

const loginSchema: LoginSchema = yup.object().shape({
	email,
	password,
});

const handleErrors = (err: ClientSideFormValidationErrors) => {
	return err.inner.reduce((object, error) => {
		return { ...object, [error.path]: error.message };
	}, {});
};

const handleValidation = async (
	schema: AuthFormSchema,
	body: AuthFormProps
) => {
	try {
		await schema.validate(body, { abortEarly: false });
	} catch (error) {
		if (error instanceof Error && 'inner' in error) {
			return handleErrors(error);
		}
	}
	return null;
};

const validateSignup = (body: SignupProps) =>
	handleValidation(signUpSchema, body);
const validateLogin = (body: LoginProps) => handleValidation(loginSchema, body);

export { validateSignup, validateLogin };
