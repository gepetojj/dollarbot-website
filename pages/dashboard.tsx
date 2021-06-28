import styled from "styled-components";
import { DocumentContext } from "next/document";
import { useEffect, useState } from "react";

import { TokenPayload } from "../utils/types";
import Layout from "../components/Layout";
import { keepAuth } from "../utils/keepAuth";

const StatsArea = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 1.5rem;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		margin-top: 1rem;
		padding-top: 0;
		justify-content: flex-start;
	}
`;

const Stats = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50%;
	margin: 2rem 0;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		flex-direction: column;
		justify-content: flex-start;
		margin: 0.5rem 0 0 0;
		height: 100%;
	}
`;

const Stat = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	min-width: 214px;
	height: 13rem;
	background-color: ${({ theme }) => theme.colors.secondaryPlus1};
	border-radius: ${({ theme }) => theme.borderRadius};
	margin: 0 1.5rem;
	padding: 1.3rem;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		margin: 0.5rem 0;
		min-width: 290px;
		height: 10rem;
	}
`;

const TopSide = styled.div``;

const StatTitle = styled.h2`
	font-weight: 600;
	font-size: 2rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		font-size: 1.7rem;
	}
`;

const StatDesc = styled.p`
	font-weight: 400;
	font-size: 0.9rem;
	padding-top: 0.3rem;

	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		font-size: 0.8rem;
	}
`;

const StatValue = styled.span`
	font-weight: 600;
	font-size: 2rem;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const StatValueP = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	font-size: 2rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const StatProgress = styled.div`
	width: 100%;
	height: 10px;
	background-color: ${({ theme }) => theme.colors.primaryMinus6};
	border-radius: 34px;
	margin: 0 1.5rem;
`;

const StatProgressBar = styled.div<{ value: number }>`
	width: ${({ value }) => `${value}%`};
	height: 10px;
	background-color: ${({ theme }) => theme.colors.primaryMinus1};
	border-radius: 34px;
	transition: 0.2s;
`;

export default function Dashboard({ data }: { data: TokenPayload }) {
	const [randomNumbers, setRandomNumbers] = useState([0, 0]);

	useEffect(() => {
		setRandomNumbers([
			Math.floor(Math.random() * 100),
			Math.floor(Math.random() * 100),
		]);
	}, []);

	return (
		<Layout title="dashboard" data={data}>
			<StatsArea>
				<Stats>
					<Stat>
						<TopSide>
							<StatTitle>Servidores</StatTitle>
							<StatDesc>
								Quantos servidores você está junto com o
								dollarbot.
							</StatDesc>
						</TopSide>
						<StatValue>{data.guilds.length}</StatValue>
					</Stat>
					<Stat>
						<TopSide>
							<StatTitle>Comandos</StatTitle>
							<StatDesc>
								Quantos comandos do dollarbot você já executou.
							</StatDesc>
						</TopSide>
						<StatValue>{randomNumbers[0]}</StatValue>
					</Stat>
					<Stat>
						<TopSide>
							<StatTitle>Corridas</StatTitle>
							<StatDesc>
								Quantas corridas de digitação você terminou em
								1º lugar.
							</StatDesc>
						</TopSide>
						<StatValue>{randomNumbers[1]}</StatValue>
					</Stat>
				</Stats>
				<Stats>
					<Stat>
						<TopSide>
							<StatTitle>Seu nível de conta</StatTitle>
							<StatDesc>
								O nível da sua conta dollarbot. Pode ser
								aumentada interagindo com o bot.
							</StatDesc>
						</TopSide>
						<StatValueP>
							1
							<StatProgress>
								<StatProgressBar value={randomNumbers[0]}></StatProgressBar>
							</StatProgress>
						</StatValueP>
					</Stat>
				</Stats>
			</StatsArea>
		</Layout>
	);
}

export async function getServerSideProps({ req }: DocumentContext) {
	return await keepAuth(req);
}
