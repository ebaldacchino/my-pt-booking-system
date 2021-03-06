import mongoose from 'mongoose';
import { prop } from './helpers';

const sessionSchema = new mongoose.Schema({
	clientId: prop(String),
	sessionLength: prop(Number, true),
	time: prop(Date, true),
});

const Session =
	mongoose.models.Session || mongoose.model('Session', sessionSchema);

export default Session;
