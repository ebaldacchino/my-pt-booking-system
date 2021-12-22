type PropType = StringConstructor | DateConstructor | BooleanConstructor | NumberConstructor

export const prop = (
	type: PropType = String,
	required: boolean = false,
	unique: boolean = false
) => ({
	type,
	required,
	unique,
});
