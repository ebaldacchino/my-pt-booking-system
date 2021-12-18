import mongoose from 'mongoose';
import type { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { NextConnect } from 'next-connect';
const connectDB =
	(handler: NextConnect<Req, Res>) => async (req: Req, res: Res) => {
		if (mongoose.connections[0].readyState) {
			console.log('Database already connected');
			return handler(req, res);
		}

		if (typeof process.env.MONGO_URI === 'string') {
			await mongoose
				.connect(process.env.MONGO_URI, {
					// useUnifiedTopology: true,
					// useNewUrlParser: true,
				})
				.then(() => console.log('Database connected successfully'))
				.catch((err) => console.log(err));
		} else {
			console.log('Database string is undefined');
		}

		return handler(req, res);
	};

export default connectDB;
