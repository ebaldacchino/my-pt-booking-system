import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { removeTokenCookie } from '../../../lib/auth-cookies';

const Logout = async (req: Req, res: Res) => {
	removeTokenCookie(res);
	res.writeHead(302, { Location: '/' });
	res.end();
};

export default Logout;
