import { body, validationResult } from 'express-validator';
import type { ValidationChain } from 'express-validator';
import { NextApiRequest, NextApiResponse } from 'next';

const validate = (validations: ValidationChain[]) => {
	return async (req: NextApiRequest, res?: NextApiResponse) => {
		// does this do anything?
		await Promise.all(
			validations.map((validation) => {
				return validation.run(req);
			})
		);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return errors.array().reduce((obj, error) => {
				return { ...obj, [error.param]: error.msg };
			}, {});
		}
		return null;
	};
};

const checkName = (name: string, title: string) =>
	body(name)
		.trim()
		.notEmpty()
		.withMessage(`Enter your ${title.toLowerCase()}`)
		.bail()
		.isLength({ min: 2 })
		.withMessage(`${title} must be 2+ characters`)
		.bail()
		.custom((val) =>
			/^([a-zZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+([-']?[a-zZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+)*(\.\s)?[ ]?)+$/i.test(
				val
			)
		)
		.withMessage(`${title} must use normal characters`);

const checkEmail = () =>
	body('email')
		.trim()
		.notEmpty()
		.withMessage('Enter your email address')
		.bail()
		.isEmail()
		.withMessage('Must be a valid email');

const checkPassword = () =>
	body('password')
		.trim()
		.notEmpty()
		.withMessage('Enter a password')
		.bail()
		.isLength({ min: 6 })
		.withMessage('Password must be 6+ characters');

const validate_signup = validate([
	checkName('givenName', 'First name'),
	checkName('familyName', 'Last name'),
	checkEmail(),
	checkPassword(),
]);

const validate_login = validate([checkEmail(), checkPassword()]);

export { validate_signup, validate_login };
