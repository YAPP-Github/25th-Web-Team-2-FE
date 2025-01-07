'use client';

import { css } from '@emotion/react';

import PostInfo from './components/PostInfo/PostInfo';
import PostInfoTable from './components/PostInfoTable/PostInfoTable';

export default function PostPage() {
  return (
    <div css={postLayout}>
      <PostInfo />
      <PostInfoTable />
    </div>
  );
}

const postLayout = css`
  height: 100vh;
`;
