import styled from "styled-components";
import Image from "next/image";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, ChangeEvent } from "react";
import { useSettings } from "./SettingsContext";

export interface IHeaderProps {
	rightSideItem: JSX.Element;
	rightSideClickEnabled?: boolean;
}

const HeaderArea = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 10%;
	padding: 3rem 3rem 0 3rem;
	margin-bottom: 3rem;
	user-select: none;

	@media (max-width: 550px) {
		flex-direction: column;
		justify-content: center;
		height: 11rem;
		padding: 3rem 0 0 0;
		margin-bottom: 1.5rem;
	}
`;

const LeftSide = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;

	& img {
		cursor: pointer;
		flex-shrink: 0;
	}

	@media (max-width: 550px) {
		justify-content: center;
	}
`;

const RightSide = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 100%;

	@media (max-width: 550px) {
		justify-content: center;
	}
`;

const Popover = styled.div`
	position: relative;
`;

const PopoverToggle = styled.div`
	cursor: pointer;
`;

const PopoverContent = styled.div`
	position: absolute;
	width: 12.5rem;
	background-color: ${({ theme }) => theme.colors.secondaryPlus1};
	border: 1px solid ${({ theme }) => theme.colors.secondary};
	border-radius: ${({ theme }) => theme.borderRadius};
	z-index: 2;
	margin-top: 1rem;
	padding: 1rem;
	transition: 0.2s;
`;

const PopoverTitle = styled.span`
	font-size: 1.2rem;
	font-weight: 600;
`;

const PopoverSettings = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0.5rem 0;
`;

const PopoverSettingsContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0.2rem 0;
`;

const PopoverSettingsText = styled.span`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0 0.1rem;
`;

const Switch = styled.label`
	position: relative;
	display: inline-block;
	width: 50px;
	height: 25px;
`;

const Slider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 34px;
	transition: 0.2s;

	&::before {
		position: absolute;
		content: "";
		width: 20px;
		height: 20px;
		left: 3px;
		bottom: 3px;
		background-color: ${({ theme }) => theme.colors.primaryPlus3};
		border-radius: 50%;
		transition: 0.2s;
	}
`;

const Checkbox = styled.input`
	opacity: 0;
	width: 0;
	height: 0;

	&:checked + ${Slider}:before {
		transform: translateX(100%);
	}
`;

export default function Header({
	rightSideItem,
	rightSideClickEnabled,
}: IHeaderProps) {
	const router = useRouter();
	const settings = useSettings();
	const switchRef = useRef<HTMLInputElement>();
	const [popoverOpen, setPopoverOpen] = useState(false);

	useEffect(() => {
		rightSideClickEnabled
			? settings.article === "vindo"
				? (switchRef.current.checked = false)
				: (switchRef.current.checked = true)
			: null;
	});

	const changeArticle = (event: ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked;
		const prefs = localStorage.getItem("settings");
		if (!prefs) {
			localStorage.setItem(
				"settings",
				JSON.stringify({
					article: checked ? 1 : 0,
				})
			);
		} else {
			const settingsJson = JSON.parse(prefs);
			localStorage.setItem(
				"settings",
				JSON.stringify({
					...settingsJson,
					article: checked ? 1 : 0,
				})
			);
		}
		settings.update();
	};

	const Switcher = () => {
		return (
			<Switch>
				<Checkbox
					type="checkbox"
					ref={switchRef}
					onChange={changeArticle}
				/>
				<Slider></Slider>
			</Switch>
		);
	};

	return (
		<HeaderArea>
			<LeftSide>
				<Image
					src="/banner-logo.png"
					alt="Logo do dollarbot"
					layout="fixed"
					width={217}
					height={71}
					priority
					onClick={() => {
						if (router.pathname !== "/") {
							router.push("/");
						}
					}}
				/>
			</LeftSide>
			<RightSide>
				<ClickAwayListener
					onClickAway={() => {
						setPopoverOpen(false);
					}}
				>
					<Popover>
						<PopoverToggle
							onClick={() => {
								setPopoverOpen(!popoverOpen);
							}}
						>
							{rightSideItem}
						</PopoverToggle>
						{rightSideClickEnabled && (
							<Grow in={popoverOpen}>
								<PopoverContent>
									<PopoverTitle
										onDoubleClick={settings.update}
									>
										Configurações
									</PopoverTitle>
									<PopoverSettings>
										Gênero
										<PopoverSettingsContent>
											<PopoverSettingsText>
												Ma.
											</PopoverSettingsText>
											<Switcher />
											<PopoverSettingsText>
												Fe.
											</PopoverSettingsText>
										</PopoverSettingsContent>
									</PopoverSettings>
								</PopoverContent>
							</Grow>
						)}
					</Popover>
				</ClickAwayListener>
			</RightSide>
		</HeaderArea>
	);
}
