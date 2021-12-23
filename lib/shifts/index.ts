import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getLoginSession } from '../auth';
import Shift from '../../models/shift';
const createshift = async (req: Req, res: Res) => {
	try {
		const session = await getLoginSession(req);
		if (!session) throw Error('Unauthenticated');
		const shift = new Shift(req.body);
		const savedShift = await shift.save();
		if (!savedShift) throw Error('Failed to save');
		res.status(200).json({ savedShift });
	} catch (error) {
		console.log(error);
		res.status(401).json({ msg: 'Unauthenticated' });
	}
};

const getShifts = async () => {
	try {
		const shifts = await Shift.find()  
		if (!shifts) throw Error();
		return shifts;
	} catch (error) {
		console.log(error)
		return null
	}
};

const updateShift = async (req: Req, res: Res) => {};

const deleteShift = async (req: Req, res: Res) => {};

const handleShifts = { createshift, getShifts, updateShift, deleteShift };
export default handleShifts;
