import mongoose from 'mongoose';
import { prop } from './helpers';

export const sessionSchema = new mongoose.Schema({
	clientId: prop(Number),
	sessionLength: prop(Number, true),
    time: prop(Date, true)
});

// const Session =
// 	mongoose.models.Session || mongoose.model('Session', sessionSchema);

// export default Session;
