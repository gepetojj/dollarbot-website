import { NextApiRequest, NextApiResponse } from "next";

const invite =
	"https://discord.com/oauth2/authorize?client_id=714842108128657458&scope=bot&permissions=8";

export default (req: NextApiRequest, res: NextApiResponse) => {
	return res.redirect(invite);
};
