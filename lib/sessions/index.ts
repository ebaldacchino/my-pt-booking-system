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

export const updateSession = async (req: Req, res: Res) => {};

export const deleteSession = async (req: Req, res: Res) => {};

const handler = {
	createSessions,
	getSessions,
	updateSession,
	deleteSession,
};
export default handler;
