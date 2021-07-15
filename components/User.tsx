import Image from "next/image";
import styled from "styled-components";

export interface IUserProps {
	avatarURL: string;
	username: string;
	discriminator: string;
}

const UserArea = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.secondaryPlus1};
	border-radius: ${({ theme }) => theme.borderRadius};
	padding: 0.7rem 0.9rem;

	& img {
		border-radius: 50%;
	}
`;

const UserName = styled.span`
	font-weight: 600;
	font-size: 1.2rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 8rem;
	padding: 0 0.3rem 0 0.5rem;
`;

const UserDiscriminator = styled.span`
	font-weight: 400;
	font-size: 0.9rem;
`;

export default function User({
	avatarURL,
	username,
	discriminator,
}: IUserProps) {
	return (
		<UserArea>
			<img
				src={avatarURL}
				alt="Avatar do usuário"
				width={30}
				height={30}
			/>
			<UserName>{username}</UserName>
			<UserDiscriminator>#{discriminator}</UserDiscriminator>
		</UserArea>
	);
}
