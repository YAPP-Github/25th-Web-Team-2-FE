import type { ExperimentPostListFilters } from '@/apis/post';
import { Role } from '@/types/user';

export const queryKey = {
  post: (filters: ExperimentPostListFilters = {}) =>
    [
      'experiment-posts',
      filters.recruitStatus ?? 'ALL',
      filters.gender ?? null,
      filters.age ?? null,
      filters.region ?? null,
      filters.areas ?? null,
      filters.matchType ?? null,
    ] as const,
  userInfo: (role?: Role) => ['userInfo', role ?? null] as const,
  postRegion: (region: string | null) => ['postRegion', region] as const,
  postArea: (region: string | null) => ['postArea', region] as const,
  experimentPostDetail: (postId: string) => ['experimentPostDetail', postId] as const,
  applyMethod: (postId: string) => ['applyMethod', postId] as const,
  originExperimentPost: (postId: string) => ['originExperimentPost', postId] as const,

  updateRecruitStatus: ['updateRecruitStatus'] as const,
  deletePost: ['deletePost'] as const,
  editPost: ['editPost'] as const,
  myPosts: ({
    page = 1,
    count = 10,
    order = 'DESC',
  }: { page?: number; count?: number; order?: string } = {}) =>
    ['myPosts', page ?? null, count ?? null, order ?? null] as const,
};
