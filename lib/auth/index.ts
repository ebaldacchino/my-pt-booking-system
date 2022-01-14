import Iron from '@hapi/iron';
import type { GetServerSidePropsContext, NextApiResponse } from 'next';
import { getTokenCookie, maxAge, setTokenCookie } from '../auth-cookies';
import type { ContextRequest, Session } from './types';

const { TOKEN_SECRET } = process.env;
const setLoginSession = async (res: NextApiResponse, session: Session) => {
	if (!TOKEN_SECRET) return;
	const createdAt = Date.now();
	const user = { ...session, password: null };
	const obj = { ...user, createdAt, maxAge };

	const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

	setTokenCookie(res, token);
	return user;
};

const getLoginSession = async (req: ContextRequest) => {
	if (!TOKEN_SECRET) return;
	const token: string = getTokenCookie(req);

	if (!token) return;
	const session: Session = await Iron.unseal(
		token,
		TOKEN_SECRET,
		Iron.defaults
	);
	const expiresAt = session.createdAt + session.maxAge * 1000;

	if (Date.now() > expiresAt) {
		throw new Error('Session expired');
	}

	return session;
};

const authUserServerSideProps = async (context: GetServerSidePropsContext) => {
	try {
		const user = await getLoginSession(context.req); 
		if (user) return { props: user };   
		throw Error();
	} catch (error) { 
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
};

export { setLoginSession, getLoginSession, authUserServerSideProps };
