import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
	ExitToAppRounded,
	HomeRounded,
	AccountBalanceWalletRounded,
	LocalGroceryStoreRounded,
} from "@material-ui/icons";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import { Discord } from "../utils/types";
import { useState } from "react";

export interface IMenuProps {
	guilds: Discord.Guild[];
}

const MenuArea = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.secondaryPlus1};
	border-radius: ${({ theme }) => theme.borderRadius};
	padding: 1.5rem;
	width: 250px;
	height: 37rem;
`;

const MenuDropdownArea = styled.div`
	display: none;
	position: relative;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const MenuController = styled.div`
	@media (max-width: ${({ theme }) => theme.responsiveBreakpoint}) {
		& ${MenuArea} {
			display: none;
		}
		& ${MenuDropdownArea} {
			display: flex;
		}
	}
`;

const MenuTab = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	height: 50%;
	margin: 0.5rem 0;

	& h2 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: left;
		font-size: 1.3rem;
		font-weight: 600;
		padding: 0 0.4rem;
	}
`;

const Scroll = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	max-width: 100%;
	height: 98%;
	max-height: 98%;
	padding: 0.5rem 0;
	overflow-x: hidden;
	overflow-y: auto;
`;

const Page = styled.a<{ selected?: boolean }>`
	display: flex;
	align-items: center;
	width: 100%;
	height: 55px;
	border: ${({ selected }) => (selected === true ? "1px" : "0")} solid
		${({ theme, selected }) => selected && `${theme.colors.primary}45`};
	border-radius: ${({ theme }) => theme.borderRadius};
	font-weight: 600;
	font-size: 1.15rem;
	background-color: ${({ theme }) => theme.colors.secondaryPlus2};
	color: ${({ theme, selected }) =>
		selected ? theme.colors.primary : theme.colors.white};
	text-decoration: none;
	user-select: none;
	outline: none;
	cursor: pointer;
	transition: 0.2s;
	margin: 0.35rem 0;
	padding: 0 1rem;

	&:hover {
		filter: brightness(120%);
	}

	& img {
		border-radius: 50%;
	}

	& span {
		max-width: 100%;
		padding-left: 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const Disconnect = styled.a`
	display: flex;
	align-items: center;
	width: 100%;
	height: 4.5rem;
	border-radius: ${({ theme }) => theme.borderRadius};
	font-weight: 600;
	font-size: 1.15rem;
	background-color: ${({ theme }) => theme.colors.redBackground};
	color: ${({ theme }) => theme.colors.red};
	text-decoration: none;
	user-select: none;
	cursor: pointer;
	transition: 0.2s;
	margin: 0.4rem 0;
	padding: 0 1rem;

	&:hover {
		filter: brightness(120%);
	}

	& span {
		max-width: 100%;
		padding-left: 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const MenuDropdown = styled.div`
	position: relative;
	width: 12.5rem;
	height: 3.5rem;
	background-color: ${({ theme }) => theme.colors.secondaryPlus1};
	border-radius: ${({ theme }) => theme.borderRadius};
	z-index: 1;
	margin-top: 1rem;
	padding: 1rem;
	transition: 0.2s;
`;

const DropdownToggle = styled.div`
	cursor: pointer;
`;

const DropdownContent = styled.div`
	position: absolute;
	left: 0;
	width: 12.5rem;
	max-height: 20rem;
	overflow-y: auto;
	background-color: ${({ theme }) => theme.colors.secondaryPlus1};
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	border-radius: ${({ theme }) => theme.borderRadius};
	z-index: 1;
	margin-top: 2rem;
	padding: 1rem;
	transition: 0.2s;
`;

const DropdownOptions = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0.5rem 0;
`;

const DropdownPage = styled.a<{ selected?: boolean }>`
	display: flex;
	align-items: center;
	background-color: ${({ theme, selected }) =>
		selected ? null : theme.colors.secondaryPlus2};
	color: ${({ theme, selected }) =>
		selected ? theme.colors.primary : theme.colors.white};
	border-radius: ${({ theme }) => theme.borderRadius};
	cursor: pointer;
	user-select: none;
	outline: none;
	padding: ${({ selected }) => (selected ? null : "0.5rem")};
	margin: ${({ selected }) => (selected ? null : "0.3rem 0")};

	&:hover {
		filter: brightness(120%);
	}

	& img {
		border-radius: 50%;
	}

	& span {
		font-weight: 600;
		max-width: 100%;
		padding-left: 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

const DropdownDisconnect = styled.a`
	display: flex;
	align-items: center;
	width: 100%;
	height: 2.5rem;
	border-radius: ${({ theme }) => theme.borderRadius};
	font-weight: 600;
	background-color: ${({ theme }) => theme.colors.redBackground};
	color: ${({ theme }) => theme.colors.red};
	text-decoration: none;
	user-select: none;
	cursor: pointer;
	transition: 0.2s;
	margin: 0.3rem 0;
	padding: 0.5rem;

	&:hover {
		filter: brightness(120%);
	}

	& span {
		font-size: 1rem;
		max-width: 100%;
		padding-left: 0.5rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export default function Menu({ guilds }: IMenuProps) {
	const router = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);

	const CurrentPage = () => {
		switch (router.pathname) {
			case "/dashboard":
				return (
					<DropdownPage selected>
						<HomeRounded style={{ fontSize: 26 }} />
						<span>Início</span>
					</DropdownPage>
				);

			case "/wallet":
				return (
					<DropdownPage selected>
						<AccountBalanceWalletRounded style={{ fontSize: 26 }} />
						<span>Sua carteira</span>
					</DropdownPage>
				);

			case "/store":
				return (
					<DropdownPage selected>
						<LocalGroceryStoreRounded style={{ fontSize: 26 }} />
						<span>Loja dollarbot</span>
					</DropdownPage>
				);

			default:
				if (router.pathname.startsWith("/guild")) {
					const { id } = router.query;
					const guild = guilds.filter((guild) => {
						return guild.id === id;
					})[0];
					return (
						<DropdownPage selected>
							<Image
								src={guild.iconURL}
								alt="Ícone do servidor"
								layout="fixed"
								width={30}
								height={30}
							/>
							<span>{guild.name}</span>
						</DropdownPage>
					);
				}
				return (
					<DropdownPage selected>
						<span>Erro</span>
					</DropdownPage>
				);
		}
	};

	const Pages = () => {
		const pages = ["/dashboard", "/wallet", "/store"];

		return (
			<DropdownOptions>
				{pages.map((page, index) => {
					if (router.pathname === page) {
						return;
					}
					return (
						<Link href={page} key={index}>
							<DropdownPage>
								{page === "/dashboard" ? (
									<HomeRounded style={{ fontSize: 26 }} />
								) : page === "/wallet" ? (
									<AccountBalanceWalletRounded
										style={{ fontSize: 26 }}
									/>
								) : (
									<LocalGroceryStoreRounded
										style={{ fontSize: 26 }}
									/>
								)}
								<span>
									{page === "/dashboard"
										? "Início"
										: page === "/wallet"
										? "Sua carteira"
										: "Loja dollarbot"}
								</span>
							</DropdownPage>
						</Link>
					);
				})}
				{guilds.map((guild) => {
					return (
						<Link href={`/guild/${guild.id}`} key={guild.id}>
							<DropdownPage
								selected={
									router.pathname === `/guild/${guild.id}`
								}
							>
								<Image
									src={guild.iconURL}
									alt="Ícone do servidor"
									layout="fixed"
									width={30}
									height={30}
								/>
								<span>{guild.name}</span>
							</DropdownPage>
						</Link>
					);
				})}
				<Link href="/api/discord/logout">
					<DropdownDisconnect>
						<ExitToAppRounded style={{ fontSize: 26 }} />
						<span>Desconectar</span>
					</DropdownDisconnect>
				</Link>
			</DropdownOptions>
		);
	};

	return (
		<MenuController>
			<MenuArea>
				<MenuTab>
					<h2>Gerenciamento</h2>
					<Scroll>
						<Link href="/dashboard">
							<Page selected={router.pathname === "/dashboard"}>
								<HomeRounded style={{ fontSize: 26 }} />
								<span>Início</span>
							</Page>
						</Link>
						<Link href="/wallet">
							<Page selected={router.pathname === "/wallet"}>
								<AccountBalanceWalletRounded
									style={{ fontSize: 26 }}
								/>
								<span>Sua carteira</span>
							</Page>
						</Link>
						<Link href="/store">
							<Page selected={router.pathname === "/store"}>
								<LocalGroceryStoreRounded
									style={{ fontSize: 26 }}
								/>
								<span>Loja dollarbot</span>
							</Page>
						</Link>
					</Scroll>
				</MenuTab>
				<MenuTab>
					<h2>Seus servidores</h2>
					<Scroll>
						{guilds.map((guild) => {
							return (
								<Link
									href={`/guild/${guild.id}`}
									key={guild.id}
								>
									<Page
										selected={router.query.id === guild.id}
									>
										<Image
											src={guild.iconURL}
											alt="Ícone do servidor"
											layout="fixed"
											width={30}
											height={30}
										/>
										<span>{guild.name}</span>
									</Page>
								</Link>
							);
						})}
					</Scroll>
				</MenuTab>
				<Link href="/api/discord/logout">
					<Disconnect>
						<ExitToAppRounded style={{ fontSize: 26 }} />
						<span>Desconectar</span>
					</Disconnect>
				</Link>
			</MenuArea>
			<MenuDropdownArea>
				<ClickAwayListener
					onClickAway={() => {
						setMenuOpen(false);
					}}
				>
					<MenuDropdown>
						<DropdownToggle
							onClick={() => {
								setMenuOpen(!menuOpen);
							}}
						>
							<CurrentPage />
						</DropdownToggle>
						<Grow in={menuOpen}>
							<DropdownContent>
								<Pages />
							</DropdownContent>
						</Grow>
					</MenuDropdown>
				</ClickAwayListener>
			</MenuDropdownArea>
		</MenuController>
	);
}
