import * as colors from './lib/theme';

export default `
  * {
    box-sizing: border-box;
  }

  body, html, #root {
    margin: 0;
    height: 100%;
  }

  body {
    background-color: ${colors.black};
    font-family: 'Open Sans', sans-serif;
    color: #313131;
  }

  a {
    color: ${colors.primary};
    text-decoration: none;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: ${colors.lightGray};
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: ${colors.lightGray};
  }
`;
