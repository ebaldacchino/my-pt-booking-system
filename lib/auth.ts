import Iron from '@hapi/iron'; 
import type { GetServerSidePropsContext } from 'next'; 
import { getTokenCookie, maxAge, setTokenCookie } from './auth-cookies'; 

export interface Session {
	_id: string;
	email: string;
	googleId: string;
	password: null;
	givenName: string;
	familyName: string;
	createdAt: number;
	maxAge: number;
}

const { TOKEN_SECRET }: { TOKEN_SECRET: string } = process.env;

const setLoginSession = async (res, session: Session) => {
	const createdAt = Date.now();
	const user = { ...session, password: null };
	const obj = { ...user, createdAt, maxAge };

	const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

	setTokenCookie(res, token);
	return user;
};

const getLoginSession = async (req) => {
	const token: string | undefined = getTokenCookie(req);
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
