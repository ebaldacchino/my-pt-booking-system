import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import connectDB from '../../../middleware/mongodb';
import nextConnect from 'next-connect';
import { validate_login } from '../../../middleware/server-form-validation';
import { setLoginSession } from '../../../lib/auth';
import { findUser, validatePassword } from '../../../lib/user';

const handler = nextConnect();

handler.post(async (req: Req, res: Res) => {
	try {
		const errors = await validate_login(req);
		if (errors) return res.status(401).json(errors);

		const { email, password } = req.body;

		const user = await findUser({ email });

		if (!user) throw Error(JSON.stringify({ email: 'Email is incorrect' }));

		const correctPassword = validatePassword(password, user.password);

		if (!correctPassword)
			throw Error(JSON.stringify({ password: 'Password is incorrect' }));

		await setLoginSession(res, user._doc);

		res.status(201).json({ msg: 'Logged in successfully' });
	} catch (err) {
		if (err instanceof Error) {
			res.status(401).json(JSON.parse(err.message));
		}
	}
	res.status(500);
});

export default connectDB(handler);
