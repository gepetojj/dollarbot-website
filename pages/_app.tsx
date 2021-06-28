import NProgress from "nprogress";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { SettingsProvider } from "../components/SettingsContext";
import { Globals } from "../styles/globals";
import { theme } from "../styles/theme";

function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	NProgress.configure({ showSpinner: false });
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			navigator.serviceWorker.register("/worker.js").then(
				(registration) => {
					console.log(
						"Service worker registered.",
						registration.scope
					);
				},
				(err) => {
					console.error("Service worker registration failed.", err);
				}
			);
		}

		const routeChangeStart = () => NProgress.start();
		const routeChangeDone = () => NProgress.done();

		router.events.on("routeChangeStart", routeChangeStart);
		router.events.on("routeChangeComplete", routeChangeDone);
		router.events.on("routeChangeError", routeChangeDone);
		return () => {
			router.events.off("routeChangeStart", routeChangeStart);
			router.events.off("routeChangeComplete", routeChangeDone);
			router.events.off("routeChangeError", routeChangeDone);
		};
	}, []);

	return (
		<>
			<SettingsProvider>
				<ThemeProvider theme={theme}>
					<Globals />
					<Component {...pageProps} />
				</ThemeProvider>
			</SettingsProvider>
		</>
	);
}

export default App;
