import User from '../models/user';
import bcrypt from 'bcryptjs';

const genPassword = (password: string): string => {
	const salt: string = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

const validatePassword = (password: string, hashedPassword: string): boolean => {
	return bcrypt.compareSync(password, hashedPassword);
};

const createUser = async (body) => {
	const password = genPassword(body.password);
	return await User.create({
		...body,
		password,
	});
};

const findUser = async (obj) => {
	try {
		return await User.findOne(obj);
	} catch (err) {
		console.log(err.message);
	}
};

const findAndUpdateUser = (filter, update) =>
	User.findOneAndUpdate(filter, update, { new: true });

export {
	createUser,
	findUser,
	genPassword,
	validatePassword,
	findAndUpdateUser,
};
