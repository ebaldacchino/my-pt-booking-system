import type { NextApiRequestCookies } from 'next/dist/server/api-utils';
import type { IncomingMessage } from 'http';

export type ContextRequest = IncomingMessage & {
	cookies: NextApiRequestCookies;
};
export interface Session {
	_id: string;
	email: string;
	googleId: string;
	password: null;
	givenName: string;
	familyName: string;
	createdAt: number;
	maxAge: number;
}
