import User from '../../models/user';
import bcrypt from 'bcryptjs';
import type { FilterProps, FindUserProps, UpdateProps, NewUser } from './types';

const genPassword = (password: string): string => {
	const salt: string = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
};

const validatePassword = (
	password: string,
	hashedPassword: string
): boolean => {
	return bcrypt.compareSync(password, hashedPassword);
};

const createUser = async (body: NewUser) => {
	const password = genPassword(body.password);
	return await User.create({
		...body,
		password,
	});
};

const findUser = async (obj: FindUserProps) => {
	try {
		return await User.findOne(obj);
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message);
		} else {
			console.log('Server error');
		}
	}
};

const findAndUpdateUser = (filter: FilterProps, update: UpdateProps) => {
	return User.findOneAndUpdate(filter, update, { new: true });
};

export {
	createUser,
	findUser,
	genPassword,
	validatePassword,
	findAndUpdateUser,
};
