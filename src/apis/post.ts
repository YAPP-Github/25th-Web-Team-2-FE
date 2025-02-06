import { API } from './config';

import { Area } from '@/app/home/home.types';
import { API_URL } from '@/constants/url';
import { ExperimentPost } from '@/types/post';

interface ExperimentPostResponse {
  content: ExperimentPost[];
  isLast: boolean;
  page: number;
  size: number;
  totalCount: number;
}

export type AreaResponse = PostAreaResponse | PostSubAreaResponse;

export interface PostAreaResponse {
  total: number;
  data: PostArea[];
}

export interface PostSubAreaResponse {
  total: number;
  data: PostArea[];
}

interface PostArea {
  name: Area;
  count: number;
}

export interface ExperimentPostListFilters {
  recruitStatus: 'ALL' | 'OPEN';
  matchType?: 'ONLINE' | 'OFFLINE' | 'ALL';
  gender?: 'MALE' | 'FEMALE' | 'ALL';
  age?: number;
  region?: string;
  areas?: string;
  page?: number;
  count?: number;
}

export const fetchPostList = async (params: ExperimentPostListFilters) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const res = await API.get<ExperimentPostResponse>(API_URL.postList(queryParams.toString()));

  return res.data;
};

export const fetchPostCount = async <T>(region?: string) => {
  const res = await API.get<T>(API_URL.postArea(region));

  return res.data;
};
