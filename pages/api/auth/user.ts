import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getLoginSession } from '../../../lib/auth';
import { findUser } from '../../../lib/user';
import nextConnect from 'next-connect';

const handler = nextConnect();
handler.get(async (req: Req, res: Res) => {
	try {
		const session = await getLoginSession(req);
		if (!session) throw Error('Invalid token');
		const { email } = session;
		const user = await findUser({ email });

		if (!user) throw Error('User not found');
		if (session && user) {
			res.status(200).json({ ...user, password: null });
		}
	} catch (error) {
		console.log(error);
		res.status(500).end('Authentication token is invalid, please log in');
	}
});

export default handler;
