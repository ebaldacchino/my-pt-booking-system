// Handled type errors with :
// https://github.com/jquense/yup/blob/master/docs/typescript.md
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

const signUpSchema: yup.SchemaOf<SignupProps> = yup.object().shape({
	givenName: yup.string().required('Enter first name').label('First name'),
	familyName: yup.string().required('Enter last name').label('Last name'),
	email,
	password,
});

const loginSchema: yup.SchemaOf<LoginProps> = yup.object().shape({
	email,
	password,
});

interface ClientSideFormValidationError {
	name: string;
	value: string;
	path: string;
	type: string;
	errors: [];
	inner: [];
	message: string;
	params: {
		label: string;
		originalValue: string;
		path: string;
		value: string;
	};
}

interface ClientSideFormValidationErrors extends Error {
	inner: ClientSideFormValidationError[];
}
const handleErrors = (err: ClientSideFormValidationErrors) => {
	return err.inner.reduce((object, error) => {
		return { ...object, [error.path]: error.message };
	}, {});
};

interface SignupProps {
	givenName: string;
	familyName: string;
	email: string;
	password: string;
}
interface LoginProps {
	email: string;
	password: string;
}
type AuthFormProps = LoginProps | SignupProps;
const handleValidation = async (
	schema: yup.SchemaOf<AuthFormProps>,
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
