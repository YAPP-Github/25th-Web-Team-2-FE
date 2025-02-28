import { globalStyle } from '@vanilla-extract/css';

import * as layers from './layers.css';

/**
 * reset
 */
globalStyle(
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video',
  {
    '@layer': {
      [layers.reset]: {
        margin: 0,
        padding: 0,
        border: 0,
        fontSize: '100%',
        font: 'inherit',
        verticalAlign: 'baseline',
      },
    },
  },
);

globalStyle(
  'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section',
  {
    '@layer': {
      [layers.reset]: {
        display: 'block',
      },
    },
  },
);

globalStyle('body', {
  '@layer': {
    [layers.reset]: {
      lineHeight: 1,
    },
  },
});

globalStyle('ol, ul', {
  '@layer': {
    [layers.reset]: {
      listStyle: 'none',
    },
  },
});

globalStyle('button', {
  '@layer': {
    [layers.reset]: {
      padding: 0,
      border: 'none',
      background: 'none',
      outline: 'none',
      cursor: 'pointer',
    },
  },
});

globalStyle('table', {
  '@layer': {
    [layers.reset]: {
      borderCollapse: 'collapse',
      borderSpacing: 0,
    },
  },
});

globalStyle('a', {
  '@layer': {
    [layers.reset]: {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
});

globalStyle('textarea', {
  '@layer': {
    [layers.reset]: {
      padding: 0,
      border: 'none',
      height: 'auto',
      resize: 'none',
    },
  },
});

globalStyle(
  'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active',
  {
    '@layer': {
      [layers.reset]: {
        WebkitTextFillColor: '#000',
        WebkitBoxShadow: '0 0 0px 1000px #fff inset',
        boxShadow: '0 0 0px 1000px #fff inset',
        transition: 'background-color 0.3s ease-in-out 0s',
      },
    },
  },
);

globalStyle('input:autofill, input:autofill:hover, input:autofill:focus, input:autofill:active', {
  '@layer': {
    [layers.reset]: {
      WebkitTextFillColor: '#000',
      WebkitBoxShadow: '0 0 0px 1000px #fff inset',
      boxShadow: '0 0 0px 1000px #fff inset',
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
});

globalStyle('input::-webkit-inner-spin-button, input::-webkit-outer-spin-button', {
  '@layer': {
    [layers.reset]: {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
});

globalStyle('*, *::before, *::after', {
  '@layer': {
    [layers.reset]: {
      boxSizing: 'border-box',
    },
  },
});

globalStyle('html', {
  '@layer': {
    [layers.reset]: {
      MozTextSizeAdjust: 'none',
      WebkitTextSizeAdjust: 'none',
      textSizeAdjust: 'none',
    },
  },
});

globalStyle('img', {
  '@layer': {
    [layers.reset]: {
      maxInlineSize: '100%',
      maxBlockSize: '100%',
    },
  },
});

globalStyle('input, textarea', {
  '@layer': {
    [layers.reset]: {
      WebkitUserSelect: 'auto',
    },
  },
});

globalStyle('textarea', {
  '@layer': {
    [layers.reset]: {
      whiteSpace: 'revert',
    },
  },
});

globalStyle('meter', {
  '@layer': {
    [layers.reset]: {
      WebkitAppearance: 'revert',
      appearance: 'revert',
    },
  },
});

globalStyle(':where(pre)', {
  '@layer': {
    [layers.reset]: {
      all: 'revert',
      boxSizing: 'border-box',
    },
  },
});

globalStyle('::placeholder', {
  '@layer': {
    [layers.reset]: {
      color: 'unset',
    },
  },
});

globalStyle(':where([hidden])', {
  '@layer': {
    [layers.reset]: {
      display: 'none',
    },
  },
});

globalStyle(':where(dialog:modal)', {
  '@layer': {
    [layers.reset]: {
      all: 'revert',
      boxSizing: 'border-box',
    },
  },
});

/**
 * global
 */
globalStyle('*', {
  '@layer': {
    [layers.reset]: {
      scrollBehavior: 'smooth',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-family)',
      fontWeight: 500,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontSmooth: 'never',
    },
  },
});

globalStyle('body', {
  '@layer': {
    [layers.reset]: {
      display: 'block',
      position: 'relative',
    },
  },
});

globalStyle('main', {
  '@layer': {
    [layers.reset]: {
      position: 'relative',
      display: 'inline-block',
      width: '100%',
    },
  },
});

globalStyle('input:disabled', {
  '@layer': {
    [layers.reset]: {
      backgroundColor: 'var(--field-02)',
      cursor: 'not-allowed',
    },
  },
});
