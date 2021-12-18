export interface NewUser {
	givenName: string;
	familyName: string;
	email: string;
	googleId?: string;
	password: string;
}

export type FindUserProps =
	| {
			googleId: string;
	  }
	| {
			email: string;
	  };

export interface FilterProps {
	email: string;
}

export interface UpdateProps {
	googleId: string;
}
