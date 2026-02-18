import type { ExperimentPostListFilters } from '@/apis/post';
import { DEFAULT_RECRUIT_STATUS } from '@/constants/filters';
import { Role } from '@/types/user';

export const queryKey = {
  post: {
    all: ['experiment-posts'] as const,
    filter: (filters: ExperimentPostListFilters = {}) =>
      [
        ...queryKey.post.all,
        filters.recruitStatus ?? DEFAULT_RECRUIT_STATUS,
        filters.gender ?? null,
        filters.age ?? null,
        filters.region ?? null,
        filters.areas ?? null,
        filters.matchType ?? null,
      ] as const,
  },
  userInfo: (role?: Role) => ['userInfo', role ?? null] as const,
  postRegion: (region: string | null) => ['postRegion', region] as const,
  postArea: (region: string | null) => ['postArea', region] as const,
  experimentPostDetail: (postId: string) => ['experimentPostDetail', postId] as const,
  applyMethod: (postId: string) => ['applyMethod', postId] as const,
  originExperimentPost: (postId: string) => ['originExperimentPost', postId] as const,

  updateRecruitStatus: ['updateRecruitStatus'] as const,
  deletePost: ['deletePost'] as const,
  editPost: ['editPost'] as const,
  myPosts: {
    all: ['myPosts'] as const,
    filter: ({
      page = 1,
      count = 10,
      order = 'DESC',
    }: { page?: number; count?: number; order?: string } = {}) =>
      [...queryKey.myPosts.all, page, count, order] as const,
    infinite: ({ count = 10, order = 'DESC' }: { count?: number; order?: string } = {}) =>
      [...queryKey.myPosts.all, 'infinite', count, order] as const,
  },
  univSearch: (query: string) => ['univSearch', query] as const,
  extractKeywordsLimit: ['extractKeywordsLimit'] as const,
};
