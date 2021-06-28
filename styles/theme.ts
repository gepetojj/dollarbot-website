export interface ITheme {
	responsiveBreakpoint: string;
	borderRadius: string;
	button: {
		width: string;
		height: string;
	};
	colors: {
		primaryMinus6: string;
		primaryMinus5: string;
		primaryMinus4: string;
		primaryMinus3: string;
		primaryMinus2: string;
		primaryMinus1: string;
		primary: string;
		primaryPlus1: string;
		primaryPlus2: string;
		primaryPlus3: string;
		secondaryMinus3: string;
		secondaryMinus2: string;
		secondaryMinus1: string;
		secondary: string;
		secondaryPlus1: string;
		secondaryPlus2: string;
		secondaryPlus3: string;
		secondaryPlus4: string;
		secondaryPlus5: string;
		secondaryPlus6: string;
		white: string;
		whiteDarker: string;
		red: string;
		redBackground: string;
	};
}

export const theme: ITheme = {
	responsiveBreakpoint: "1155px",
	borderRadius: "4px",
	button: {
		width: "170px",
		height: "40px",
	},
	colors: {
		primaryMinus6: "#050914",
		primaryMinus5: "#101A3D",
		primaryMinus4: "#1B2B65",
		primaryMinus3: "#253C8D",
		primaryMinus2: "#304DB6",
		primaryMinus1: "#4967CF",
		primary: "#7289DA",
		primaryPlus1: "#9AAAE4",
		primaryPlus2: "#C2CCEF",
		primaryPlus3: "#EBEEFA",

		secondaryMinus3: "#000000",
		secondaryMinus2: "#090A0B",
		secondaryMinus1: "#131316",
		secondary: "#1D1E22",
		secondaryPlus1: "#26272C",
		secondaryPlus2: "#2F3137",
		secondaryPlus3: "#383B42",
		secondaryPlus4: "#42454D",
		secondaryPlus5: "#4B4E58",
		secondaryPlus6: "#555863",

		white: "#FFFFFF",
		whiteDarker: "#E5E5E5",

		red: "#EB6464",
		redBackground: "#312A2A",
	},
};
