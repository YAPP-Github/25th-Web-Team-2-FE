import { MetadataRoute } from 'next';

import { fetchPostList } from '@/apis/post';
import { ExperimentPost } from '@/types/post';

const SITE_URL = 'https://gradmeet.co.kr';

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
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ] as const;

  // 게시물 상세 페이지 경로 추가
  const posts = await fetchAllPosts();
  const postRoutes = posts.map(
    (post) =>
      ({
        url: `${SITE_URL}/post/${post.postInfo.experimentPostId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      } as const),
  );

  return [...staticRoutes, ...postRoutes];
}
