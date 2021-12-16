import { Password } from "@hapi/iron";

declare global {
	namespace EnvironmentVariables {
		interface ProcessEnv {
			MONGO_URI: string;
			TOKEN_SECRET: Password | Secret | Specific;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
		}
	}
}
