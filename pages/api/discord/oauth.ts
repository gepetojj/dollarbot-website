import { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../../utils/config";

const oauthParams = new URLSearchParams({
	client_id: config.clientId,
	redirect_uri: config.baseUrl + config.redirectUri,
	scope: "identify guilds",
	response_type: "code",
	prompt: "consent",
}).toString();
const oauth = `https://discord.com/api/oauth2/authorize?${oauthParams}`;

export default (req: NextApiRequest, res: NextApiResponse) => {
	return res.redirect(oauth);
};
