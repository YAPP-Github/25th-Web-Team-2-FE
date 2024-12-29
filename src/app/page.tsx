'use client';

import { css } from '@emotion/react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <span
        css={css`
          color: lightblue;
          font-size: 1.8rem;
        `}
      >
        test
      </span>
    </div>
  );
}
