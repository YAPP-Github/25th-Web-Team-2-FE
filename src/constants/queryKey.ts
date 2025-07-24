import type { ExperimentPostListFilters } from '@/apis/post';
import { Role } from '@/types/user';

export const QUERY_KEY = {
  post: 'experiment-posts',
  postRegion: 'postRegion',
  postArea: 'postArea',
  updateRecruitStatus: 'updateRecruitStatus',
  deletePost: 'deletePost',
  experimentPostDetail: 'experimentPostDetail',
  participantInfo: 'participantInfo',
  researcherInfo: 'researcherInfo',
  checkValidEmail: 'checkValidEmail',
  checkValidEmailInfo: 'checkValidEmailInfo',
  editPost: 'editPost',
  originExperimentPost: 'originExperimentPost',
  applyMethod: 'applyMethod',
};

export const queryKey = {
  post: (filters: ExperimentPostListFilters) =>
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
};
