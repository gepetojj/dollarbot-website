import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class _Document extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="pt-br">
				<Head>
					<meta name="title" content="dollarbot." />
					<meta
						name="description"
						content="O dollarbot é um bot para o Discord, com funcionalidades relacionadas ao dólar. Convide-o agora mesmo para o seu servidor."
					/>
					<meta property="og:type" content="website" />
					<meta
						property="og:url"
						content="https://dollarbot.netlify.app/"
					/>
					<meta property="og:title" content="dollarbot." />
					<meta
						property="og:description"
						content="O dollarbot é um bot para o Discord, com funcionalidades relacionadas ao dólar. Convide-o agora mesmo para o seu servidor."
					/>
					<meta property="og:image" content="/banner.png" />
					<meta
						property="twitter:card"
						content="summary_large_image"
					/>
					<meta
						property="twitter:url"
						content="https://dollarbot.netlify.app/"
					/>
					<meta property="twitter:title" content="dollarbot." />
					<meta
						property="twitter:description"
						content="O dollarbot é um bot para o Discord, com funcionalidades relacionadas ao dólar. Convide-o agora mesmo para o seu servidor."
					/>
					<meta property="twitter:image" content="/banner.png" />

					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="/nprogress.css"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default _Document;
