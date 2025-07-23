import type { ExperimentPostListFilters } from '@/apis/post';
import { AREAS, REGIONS } from '@/constants/filters';

export type RegionType = (typeof REGIONS)[number];
export type AreaType = (typeof AREAS)[number];

export type ExperimentPostListFilterParams = {
  [K in keyof ExperimentPostListFilters]: ExperimentPostListFilters[K] | null;
};
