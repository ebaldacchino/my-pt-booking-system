import nextConnect from 'next-connect';
import shifts from '../../../lib/shifts';

const handler = nextConnect();
handler
	.get(shifts.getShifts)
	.post(shifts.createshift)
	.put(shifts.updateShift)
	.delete(shifts.deleteShift);

export default handler;
