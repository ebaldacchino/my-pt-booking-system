// https://github.com/tomanagle/google-oauth-tutorial

import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import nextConnect from 'next-connect';
import fetcher from '../../../lib/fetcher';
import {
	createUser,
	findAndUpdateUser,
	findUser,
	genPassword,
} from '../../../lib/user';
import { setLoginSession } from '../../../lib/auth';
import crypto from 'crypto';
import connectDB from '../../../middleware/mongodb';

const handler = nextConnect<Req, Res>();

const { GOOGLE_CLIENT_ID: client_id, GOOGLE_CLIENT_SECRET: client_secret } =
	process.env;

const redirect_uri = 'http://localhost:3000/api/auth/google';

const getTokens = async (code: string) => {
	const url = 'https://oauth2.googleapis.com/token';
	const values = {
		code,
		client_id,
		client_secret,
		redirect_uri,
		grant_type: 'authorization_code',
	};

	try {
		const { data } = await fetcher(url, values);
		return data;
	} catch (err) {
		console.log('Error : In get Google tokens catch block');
	}
};

const getGoogleAccount = async (access_token: string, id_token: string) => {
	try {
		const url: string = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;
		const headers: {
			Authorization: string;
		} = {
			Authorization: `Bearer ${id_token}`,
		};
		const { data } = await fetcher(url, null, headers);
		return data;
	} catch (err) {
		console.log('Error : In get Google account catch block');
	}
};

interface GoogleData {
	email: string;
	given_name: string;
	family_name: string;
	id: string;
}
handler.get(async (req: Req, res: Res) => {
	try {
		if (typeof req.query.code !== 'string') throw Error();

		const { access_token, id_token } = await getTokens(req.query.code);

		const data: GoogleData | undefined = await getGoogleAccount(
			access_token,
			id_token
		);

		if (!data) throw Error();

		const { email, given_name, family_name, id: googleId } = data;

		let user;

		if (typeof googleId === 'string') user = await findUser({ googleId });

		if (!user) user = await findAndUpdateUser({ email }, { googleId });

		if (!user) {
			user = await createUser({
				email,
				givenName: given_name,
				familyName: family_name,
				googleId,
				password: await genPassword(crypto.randomBytes(16).toString('hex')),
			});
		}

		await setLoginSession(res, user._doc);
		res.redirect(301, '/book');
	} catch (err) {
		console.log('Error : In Google auth handler catch block');
	}
});

export default connectDB(handler);
