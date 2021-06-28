import { parse } from "cookie";
import { IncomingMessage } from "http";
import { verify } from "jsonwebtoken";
import { config } from "./config";
import { TokenPayload } from "./types";

export async function keepAuth(req: IncomingMessage) {
	const cookies = req.headers.cookie;
	if (!cookies) {
		return {
			redirect: { destination: "/api/discord/oauth", permanent: false },
		};
	}

	const session = parse(cookies).session;
	if (!session) {
		return {
			redirect: { destination: "/api/discord/oauth", permanent: false },
		};
	}

	return verify(session, config.jwtSecret, (err, decoded: TokenPayload) => {
		if (err) {
			console.error(err);
			return {
				redirect: {
					destination: "/?e=invalid_session",
					permanent: false,
				},
			};
		}
		return { props: { data: decoded } };
	});
}