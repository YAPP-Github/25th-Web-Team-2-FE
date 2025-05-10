import { fetchClient } from './config/fetchClient';

import { API_URL } from '@/constants/url';
import { AreaType, RegionType } from '@/types/filter';
import { ExperimentPost } from '@/types/post';

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
  recruitStatus: 'ALL' | 'OPEN';
  matchType?: 'ONLINE' | 'OFFLINE' | 'ALL';
  gender?: 'MALE' | 'FEMALE';
  age?: number;
  region?: RegionType;
  areas?: AreaType[];
  page?: number;
  count?: number;
}

export const fetchPostList = async (params: ExperimentPostListFilters) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Number.isInteger(value)) {
      queryParams.append(key, String(value));
    } else if (Array.isArray(value) && value.length > 0) {
      value.forEach((v) => {
        queryParams.append(key, String(v));
      });
    } else if (value !== undefined && value !== null && Object.keys(value).length > 0) {
      queryParams.append(key, String(value));
    }
  });

  return await fetchClient.get<ExperimentPostResponse>(API_URL.postList(queryParams.toString()));
};

export const fetchPostCount = async <T>(region?: string | null) => {
  return await fetchClient.get<T>(API_URL.postArea(region));
};
