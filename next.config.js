module.exports = {
	target: "serverless",
	images: {
		domains: ["cdn.discordapp.com"],
	},
	future: {
		webpack5: true,
	},
	poweredByHeader: false,
	reactStrictMode: true,
};
