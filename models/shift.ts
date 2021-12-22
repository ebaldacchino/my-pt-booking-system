import mongoose from 'mongoose';
import { prop } from './helpers';
import { sessionSchema } from './session';

const shiftSchema = new mongoose.Schema({
	date: prop(Date, true, true),
	sessions: [sessionSchema],
});

const Shift = mongoose.models.Shift || mongoose.model('Shift', shiftSchema);

export default Shift;
