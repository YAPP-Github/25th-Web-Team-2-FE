import { css } from '@emotion/react';

import reset from './reset';

const global = css`
  ${reset}

  :root {
    --font-family: 'Pretendard', 'Inter', sans-serif;
  }

  * {
    scroll-behavior: smooth;
    box-sizing: border-box;
    font-family: var(--font-family);
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-smooth: never;
  }

  /* 브라우저 기본 폰트 크기에(16px)에 상대적인 비율(%)로 설정하여 접근성 향상 */
  html {
    background-color: #ffffff;
    color: #3c3f44;
    line-height: 1.4;
    font-size: 62.5%; /* 1rem = 10px*/
  }

  body {
    display: block;
    font-family: var(--font-family);
    position: relative;
  }

  main {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .a11yHidden {
    display: inline-block;
    overflow: hidden;
    clip: rect(0px, 0px, 0px, 0px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute !important;
  }
`;

export default global;
