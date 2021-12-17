import mongoose from 'mongoose';

const prop = (
	type: StringConstructor = String,
	required: boolean = false,
	unique: boolean = false
) => ({
	type,
	required,
	unique,
});

const userSchema = new mongoose.Schema({
	email: prop(String, true, true),
	googleId: String,
	facebookId: String,
	password: prop(String, true),
	givenName: prop(String, true),
	familyName: prop(String, true),
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
