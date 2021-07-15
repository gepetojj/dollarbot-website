import { NextApiRequest, NextApiResponse } from "next";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import { firestore } from "../../../utils/firebase";
import { config } from "../../../utils/config";
import { axios } from "../../../utils/axios";
import { Discord, TokenPayload } from "../../../utils/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { code = null, error = null } = req.query;

	if (error) {
		return res.redirect(config.baseUrl + `/?e=${error}`);
	}

	if (!code || typeof code !== "string") {
		return res.redirect(config.baseUrl + "/?e=no_code_provided");
	}

	const codeExchangeParams = new URLSearchParams({
		client_id: config.clientId,
		client_secret: config.clientSecret,
		grant_type: "authorization_code",
		code,
		redirect_uri: config.baseUrl + config.redirectUri,
	}).toString();

	try {
		const codeExchange = await axios.post(
			"https://discord.com/api/oauth2/token",
			codeExchangeParams
		);
		const accessToken: string = codeExchange.data.access_token;
		const userDataRequest = await axios.get(
			"https://discord.com/api/users/@me",
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		);
		let userData: Discord.User = userDataRequest.data;
		userData.avatarURL = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp`;

		if (
			!("id" in userData) ||
			!("username" in userData) ||
			!("discriminator" in userData) ||
			!("avatar" in userData)
		) {
			return res.redirect(config.baseUrl + "/?e=invalid_data");
		}

		const userGuildsRequest = await axios.get(
			"https://discord.com/api/users/@me/guilds",
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		);
		let userGuilds: Discord.Guild[] = userGuildsRequest.data;
		userGuilds.forEach((guild, index) => {
			userGuilds[
				index
			].iconURL = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`;
		});
		let displayGuilds: Discord.Guild[] = [];
		const dollarbotGuilds = await firestore.collection("guilds").get();
		if (!dollarbotGuilds.empty) {
			dollarbotGuilds.forEach((dollarbotGuild) => {
				const dbGuildData = dollarbotGuild.data();
				const displayGuild = userGuilds.filter((guild) => {
					return guild.id === dbGuildData.id;
				});
				if (displayGuild.length) {
					displayGuilds.push(displayGuild[0]);
				}
			});
		}

		const tokenPayload: TokenPayload = {
			...userData,
			guilds: displayGuilds,
		};
		const token = sign(tokenPayload, config.jwtSecret, { expiresIn: "1d" });
		res.setHeader(
			"Set-Cookie",
			serialize("session", token, {
				httpOnly: true,
				secure: !config.dev,
				sameSite: "lax",
				path: "/",
				maxAge: 86400, // 1 dia em segundos
			})
		);
		return res.redirect(config.baseUrl + "/dashboard");
	} catch (err) {
		console.error(err.message);
		return res.redirect(config.baseUrl + "/?e=generic_error");
	}
};
