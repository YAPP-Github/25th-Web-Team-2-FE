'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidateExperimentPosts() {
  revalidateTag('experiment-posts');
}
