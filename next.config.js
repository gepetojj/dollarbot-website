module.exports = {
	target: "serverless",
	images: {
		loader: "imgix",
		path: "https://dollarbot.imgix.net/",
		domains: ["cdn.discordapp.com"],
	},
	future: {
		webpack5: false,
	},
	poweredByHeader: false,
	reactStrictMode: true,
};
