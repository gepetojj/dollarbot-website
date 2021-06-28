import { createContext, useContext, useEffect, useState } from "react";

export type Article = "vindo" | "vinda";
export const Articles: Article[] = ["vindo", "vinda"];

export interface ISettingsContext {
	article: Article;
	update: () => void;
}

const Context = createContext<ISettingsContext>({
	article: Articles[0],
	update: () => {},
});

export function SettingsProvider({ children }) {
	const [updater, setUpdater] = useState(false);
	const [ctx, setCtx] = useState<ISettingsContext>({
		article: Articles[0],
		update: () => {
			setUpdater(!updater);
		},
	});

	const update = () => {
		setUpdater(!updater);
	};

	useEffect(() => {
		const settings = localStorage.getItem("settings");
		if (!settings) {
			localStorage.setItem("settings", JSON.stringify({ article: 0 }));
			setCtx({ article: Articles[0], update });
		} else {
			const settingsJson = JSON.parse(settings);
			const article = settingsJson.article;
			const articles = [0, 1];

			if (!article || !articles.includes(article)) {
				localStorage.setItem(
					"settings",
					JSON.stringify({ ...settingsJson, article: 0 })
				);
				setCtx({ ...settingsJson, article: Articles[0], update });
			} else {
				setCtx({ ...settingsJson, article: Articles[article], update });
			}
		}
	}, [updater]);

	return <Context.Provider value={ctx}>{children}</Context.Provider>;
}

export function useSettings() {
	const context = useContext(Context);
	return context;
}
