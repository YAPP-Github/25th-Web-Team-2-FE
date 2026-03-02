import type { ExperimentPostListFilters } from '@apis/post';
import { AREAS, MATCH_TYPE, REGIONS } from '@constants/filters';

export type RegionType = (typeof REGIONS)[number];
export type AreaType = (typeof AREAS)[number];

export type ExperimentPostListFilterParams = {
  [K in keyof ExperimentPostListFilters]: ExperimentPostListFilters[K] | null;
};

export type MatchType = (typeof MATCH_TYPE)[keyof typeof MATCH_TYPE];

export interface FilterOption {
  label: string;
  value: string;
}
