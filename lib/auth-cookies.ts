import { serialize, parse } from 'cookie';
import type { NextApiResponse } from 'next';
import type { ContextRequest } from './auth/types';

const maxAge = 60 * 60 * 8;

const setTokenCookie = (res: NextApiResponse, token: string): void => {
	const now = Date.now(); 
	const cookie = serialize('token', token, {
		maxAge,
		expires: new Date(now + maxAge * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		sameSite: 'lax',
	});

	res.setHeader('Set-Cookie', cookie);
};

const removeTokenCookie = (res: NextApiResponse): void => {
	const cookie = serialize('token', '', {
		maxAge: -1,
		path: '/',
	});

	res.setHeader('Set-Cookie', cookie);
};

const parseCookies = (req: ContextRequest) => {
	if (req.cookies) return req.cookies;

	const cookie = req.headers?.cookie;
	return parse(cookie || '');
};

const getTokenCookie = (req: ContextRequest) => {
	const cookies = parseCookies(req);
	return cookies.token;
};

export {
	getTokenCookie,
	maxAge,
	parseCookies,
	removeTokenCookie,
	setTokenCookie,
};
