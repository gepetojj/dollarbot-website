import { parse } from "cookie";
import { verify } from "jsonwebtoken";

import Layout from "../../components/Layout";
import { config } from "../../utils/config";
import { Discord, TokenPayload } from "../../utils/types";

export interface IGuildPageProps {
	data: TokenPayload;
	guild: Discord.Guild;
}

export default function Guild({ data, guild }: IGuildPageProps) {
	return (
		<Layout title={guild.name} data={data}>
			<h1>{guild.name}</h1>
		</Layout>
	);
}

export async function getServerSideProps({ req, params }) {
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
		const guildId = params.id;
		const guild = decoded.guilds.filter((guild) => {
			return guildId === guild.id;
		})[0];
		return { props: { data: decoded, guild } };
	});
}
