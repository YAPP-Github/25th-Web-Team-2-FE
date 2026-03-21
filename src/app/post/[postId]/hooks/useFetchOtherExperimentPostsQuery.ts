import { useQuery } from '@tanstack/react-query';

import { fetchOtherPosts } from '@/apis/post';
import { queryKey } from '@/constants/queryKey';

export const useFetchOtherExperimentPostsQuery = (postId: string) => {
  return useQuery({
    queryKey: queryKey.post.otherPosts(postId),
    queryFn: () => fetchOtherPosts(postId),
    enabled: !!postId,
    select: (data) => data.relatedPosts,
  });
};
