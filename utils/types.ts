export interface TokenPayload extends Discord.User {
	guilds: Discord.Guild[];
}

export namespace Discord {
	export interface User {
		id: string;
		username: string;
		discriminator: string;
		avatar: string;
		avatarURL: string;
	}

	export interface Guild {
		id: string;
		name: string;
		icon: string;
		iconURL: string;
		permissions: string;
		members?: GuildMember[];
		channels?: GuildChannel[];
	}

	export interface GuildMember {
		user: User;
		nick: string;
		roles: GuildRole[];
	}

	export interface GuildRole {
		id: string;
		name: string;
		color: string;
		position: number;
		permissions: string;
	}

	export interface GuildChannel {
		id: string;
		type: number;
		guild_id: string;
		name: string;
	}
}
