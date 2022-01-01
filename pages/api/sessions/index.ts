import nextConnect from 'next-connect';
import sessions from '../../../lib/sessions';

const handler = nextConnect();
handler
	.get(sessions.getSessions)
	.post(sessions.createSessions)
	.put(sessions.updateSession)
	.delete(sessions.deleteSession);

export default handler;
