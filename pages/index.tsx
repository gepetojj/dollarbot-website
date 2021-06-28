import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

import Header from "../components/Header";

const Fullpage = styled.div`
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
`;

const Main = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80%;
`;

const Button = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ theme }) => theme.button.width};
	height: ${({ theme }) => theme.button.height};
	border-radius: ${({ theme }) => theme.borderRadius};
	font-weight: 600;
	font-size: 1.15rem;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};
	text-decoration: none;
	user-select: none;
	cursor: pointer;
	transition: 0.2s;

	&:hover {
		filter: brightness(80%);
	}
`;

const Highlight = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: ${({ theme }) => theme.borderRadius};
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.white};

	@media (min-width: 550px) {
		padding-right: 2rem;
	}

	@media (max-width: 550px) {
		padding: 0.5rem 1rem 0.5rem 0.5rem;
	}

	@media (max-width: 375px) {
		width: 90%;
	}
`;

const HighlightLeft = styled.div`
	width: 100%;
	padding-right: 2rem;

	@media (max-width: 550px) {
		padding-right: 0;

		& div {
			width: 103px !important;
			height: 103px !important;
		}
	}
`;

const HighlightRight = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	& h1,
	p {
		text-align: right;
	}

	& h1 {
		font-size: 3.3rem;
		font-weight: 600;
		height: 65px;
	}

	& p {
		font-weight: 400;
	}

	@media (max-width: 550px) {
		& h1 {
			font-size: 2.6rem;
			font-weight: 600;
			height: 52px;
		}

		& p {
			font-weight: 400;
		}
	}
`;

const Invite = styled.div`
	padding-top: 4rem;
`;

export default function Home() {
	return (
		<Fullpage>
			<Head>
				<title>dollarbot</title>
			</Head>
			<Header
				rightSideItem={
					<Link href="/dashboard">
						<Button>Dashboard</Button>
					</Link>
				}
			/>
			<Main>
				<Highlight>
					<HighlightLeft>
						<Image
							src="/logo.png"
							alt="Logo do dollarbot"
							layout="fixed"
							width={153}
							height={153}
							priority
						/>
					</HighlightLeft>
					<HighlightRight>
						<h1>dollarbot</h1>
						<p>Seu bot para o discord.</p>
					</HighlightRight>
				</Highlight>
				<Invite>
					<Link href="/api/discord/invite">
						<Button>Convidar</Button>
					</Link>
				</Invite>
			</Main>
		</Fullpage>
	);
}
