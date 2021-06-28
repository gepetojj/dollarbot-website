import Head from "next/head";
import styled from "styled-components";

import Menu from "./Menu";
import Header from "./Header";
import User from "./User";
import { useSettings } from "./SettingsContext";
import { TokenPayload } from "../utils/types";

const Fullpage = styled.div`
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
`;

const Main = styled.main`
	display: flex;
	align-items: center;
	height: 80%;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		flex-direction: column;
		overflow-y: auto;
		height: 100%;
		margin-top: 1rem;
	}
`;

const LeftSide = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25%;
	height: 100%;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		width: 100%;
		height: 4rem;
	}
`;

const RightSide = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 75%;
	height: 100%;
	padding: 0 3% 0 0.5rem;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		justify-content: flex-start;
		overflow-y: auto;
		width: 100%;
		height: 100vh;
		margin-top: 1rem;
	}
`;

const Title = styled.h1`
	flex-shrink: 0;
	font-weight: 600;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
	margin-top: 4.5rem;
	padding-left: 0.8rem;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		margin-top: 1rem;
		font-size: 1.8em;
	}
`;

export default function Layout({
	title,
	data,
	children,
}: {
	title: string;
	data: TokenPayload;
	children?: JSX.Element;
}) {
	const settings = useSettings();

	return (
		<Fullpage>
			<Head>
				<title>dollarbot | {title}</title>
			</Head>
			<Header rightSideItem={<User {...data} />} rightSideClickEnabled />
			<Main>
				<LeftSide>
					<Menu guilds={data.guilds} />
				</LeftSide>
				<RightSide>
					<Title>
						Bem {settings.article}, {data.username}!
					</Title>
					{children && children}
				</RightSide>
			</Main>
		</Fullpage>
	);
}
