'use client';

import { css } from '@emotion/react';
import styles from './page.module.css';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/test');
      return await res.json();
    };

    fetchData();
  }, []);

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
