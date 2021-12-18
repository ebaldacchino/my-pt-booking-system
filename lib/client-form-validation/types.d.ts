export interface LoginProps {
	email: string;
	password: string;
}
export interface SignupProps extends LoginProps {
	givenName: string;
	familyName: string;
}

export type AuthFormProps = LoginProps | SignupProps;


export interface ClientSideFormValidationError {
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

export interface ClientSideFormValidationErrors extends Error {
	inner: ClientSideFormValidationError[];
}

export type LoginSchema = yup.SchemaOf<LoginProps>;

export type SignupSchema = yup.SchemaOf<SignupProps>;

export type AuthFormSchema = yup.SchemaOf<AuthFormProps>;