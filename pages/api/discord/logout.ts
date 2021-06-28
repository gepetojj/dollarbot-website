import { NextApiResponse } from "next";
import { serialize } from "cookie";
import { config } from "../../../utils/config";

export default (_, res: NextApiResponse) => {
	res.setHeader(
		"Set-Cookie",
		serialize("session", "", {
			httpOnly: true,
			secure: !config.dev,
			sameSite: "lax",
			path: "/",
			maxAge: -1,
		})
	);
	return res.redirect(config.baseUrl + "/?e=logout");
};
