'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidateExperimentPosts(postId?: string) {
  revalidateTag('experiment-posts'); // 목록

  if (postId) {
    revalidateTag(`experiment-post-${postId}`); // 상세
    revalidateTag(`experiment-post-${postId}-method`); // 참여 방법
  }
}
