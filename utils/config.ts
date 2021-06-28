const config = {
	dev: process.env.NODE_ENV === "development" ? true : false,
	baseUrl:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://dollarbot.netlify.app",
	jwtSecret: String(process.env.JWT_SECRET),
	clientId: String(process.env.CLIENT_ID),
	clientSecret: String(process.env.CLIENT_SECRET),
	pkid: String(process.env.PKID),
	pk: String(process.env.PK).replace(/\\n/g, "\n"),
	ce: String(process.env.CE),
	cid: String(process.env.CID),
	curl: String(process.env.CURL),
	redirectUri: "/api/discord/callback",
};

export { config };
