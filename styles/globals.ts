import { createGlobalStyle } from "styled-components";

const Globals = createGlobalStyle`
    * { box-sizing: border-box; }
    html, body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        text-rendering: optimizeLegibility;
        background-color: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.white};
    }
    h1, h2, h3, h4, h5, h6, p, a, span { margin: 0; }
`;

export { Globals };
