import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${({ theme }) => theme.bodyBackground};
        color: ${({ theme }) => theme.textColor};
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    a {
        text-decoration: none;
        color: ${({ theme }) => theme.linkColor};
    }

    a:hover {
        text-decoration: underline;
    }

    h2, h3 {
        color: ${({ theme }) => theme.textColor};
    }

    button {
        font-family: inherit;
    }
`;

export default GlobalStyle;
