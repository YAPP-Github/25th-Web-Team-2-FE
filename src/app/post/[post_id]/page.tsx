'use client';

import { css } from '@emotion/react';

import PostDetailContent from './components/PostDetailContent/PostDetailContent';
import PostInfo from './components/PostInfo/PostInfo';
import PostOutline from './components/PostOutline/PostOutline';

export default function PostPage() {
  return (
    <div css={postLayout}>
      <PostInfo />
      <div css={postContentLayout}>
        <PostDetailContent />
        <PostOutline/>
      </div>
    </div>
  );
}

const postLayout = css`
  height: 100vh;
  position: relative;

`;


const postContentLayout = css`
  display: flex;
  flex-flow: row nowrap;
  gap: 1.2rem;
  
  margin-top: 2.4rem;

  border-radius: 1.2rem;
`;


