import { fetchClient } from './config/fetchClient';

import { API_URL } from '@/constants/url';
import { AreaType, MatchType, RegionType } from '@/types/filter';
import { ExperimentPost } from '@/types/post';
import { Gender } from '@/types/user';
import { getQueryParamsToString } from '@/utils/getQueryParamsString';

export interface ExperimentPostResponse {
  content: ExperimentPost[];
  isLast: boolean;
  page: number;
  size: number;
  totalCount: number;
}

export type AreaResponse = PostRegionResponse | PostAreaResponse;

export interface PostRegionResponse {
  total: number;
  data: ExperimentPostRegion[];
}

export interface PostAreaResponse {
  total: number;
  data: ExperimentPostArea[];
}

export interface ExperimentPostRegion {
  name: RegionType;
  count: number;
}

export interface ExperimentPostArea {
  name: AreaType;
  count: number;
}

export interface ExperimentPostListFilters {
  recruitStatus?: 'ALL' | 'OPEN';
  matchType?: MatchType;
  gender?: Gender;
  age?: number;
  region?: RegionType;
  areas?: AreaType[];
  page?: number;
  count?: number;
}

export interface ExtractKeywordsLimitResponse {
  count: number;
  limit: number;
  remainingCount: number;
  resetsAt: string;
}

export const fetchPostList = async (params: ExperimentPostListFilters) => {
  const queryParams = getQueryParamsToString({ ...params });
  return await fetchClient.get<ExperimentPostResponse>(API_URL.postList(queryParams), {
    requireAuth: false,
  });
};

export const fetchPostCount = async <T>(region?: string | null) => {
  return await fetchClient.get<T>(API_URL.postArea(region), { requireAuth: false });
};

export const fetchExtractKeywordsLimit = async () => {
  return await fetchClient.get<ExtractKeywordsLimitResponse>(API_URL.extractKeywordsLimit);
};
