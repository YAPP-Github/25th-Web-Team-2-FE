import { MetadataRoute } from 'next';

import { ExperimentPost } from '@/types/post';
import { fetchPostList } from '@apis/post';

const SITE_URL = 'https://gradmeet.co.kr';

export const revalidate = 3600;

async function fetchAllPosts() {
  const allPosts: ExperimentPost[] = [];
  let page = 1;
  let isLast = false;

  console.log('Sitemap: Start fetching all posts...');

  while (!isLast) {
    try {
      const response = await fetchPostList({
        recruitStatus: 'ALL',
        page,
        count: 100,
      });

      if (response.content.length > 0) {
        allPosts.push(...response.content);
      }

      isLast = response.isLast;
      page += 1;
    } catch (error) {
      console.error('Sitemap: Failed to fetch posts for page', page, error);
      break;
    }
  }

  console.log(`Sitemap: Total ${allPosts.length} posts fetched.`);
  return allPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    {
      url: SITE_URL,
    },
  ] as const;

  // 게시물 상세 페이지 경로 추가
  const posts = await fetchAllPosts();
  const postRoutes = posts.map(
    (post) =>
      ({
        url: `${SITE_URL}/post/${post.postInfo.experimentPostId}`,
      } as const),
  );

  return [...staticRoutes, ...postRoutes];
}
