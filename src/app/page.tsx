'use client';

import styles from './page.module.css';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <div className={styles.page}>
      <Test>테스트</Test>
    </div>
  );
}

const Test = styled.div`
  background-color: blue;
`;
