import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getLoginSession } from '../auth';
import Session from '../../models/session';
export const createSessions = async (req: Req, res: Res) => {
	try {
		const loggedInSession = await getLoginSession(req);
		if (!loggedInSession) throw Error('Unauthenticated');
		const savedShift = await Session.insertMany(req.body);
		console.log(savedShift);
		if (!savedShift) throw Error('Failed to save');
		res.status(200).json({ savedShift });
	} catch (error) {
		console.log(error);
		res.status(401).json({ msg: 'Unauthenticated' });
	}
};

export const getSessions = async () => {
	try {
		const sessions = await Session.find();
		if (!sessions) throw Error();
		return sessions;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateSession = async (req: Req, res: Res) => {
	try {
		const { _id } = req.body;

		const user = await getLoginSession(req);
		if (!user) throw Error();
		const session = await Session.findOneAndUpdate(
			{ _id },
			{ clientId: user._id }
		);
		res.status(200).json({ session });
	} catch (err) {
		console.log(err);
		res.status(500)
	}
};

export const deleteSession = async (req: Req, res: Res) => {
	try {
		const { _id } = req.body;
		const deletedSession = await Session.deleteOne({ _id });
		res.status(200).json({ deletedSession });
	} catch (err) {
		console.log(err);
		res.status(404).json({ err });
	}
};

const handler = {
	createSessions,
	getSessions,
	updateSession,
	deleteSession,
};
export default handler;
