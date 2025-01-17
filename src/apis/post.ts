import { API } from './config';

import { Area } from '@/app/home/home.types';
import { API_URL } from '@/constants/url';
import { Post } from '@/types/post';

type PostResponse = Post[];

export type AreaResponse = PostAreaResponse | PostSubAreaResponse;

export interface PostAreaResponse {
  total: number;
  area: PostArea[];
}

export interface PostSubAreaResponse {
  total: number;
  district: PostArea[];
}

interface PostArea {
  id: number;
  name: Area;
  count: number;
}

export interface PostListParams {
  matchType?: 'ONLINE' | 'OFFLINE' | 'ALL';
  gender?: '' | 'MALE' | 'FEMALE' | 'ALL';
  age?: number;
  region?: string;
  areas?: string;
  recruitDone?: boolean;
  page?: number;
  count?: number;
}

export const fetchPostList = async (params: PostListParams) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  });

  const res = await API.get<PostResponse>(API_URL.postList(queryParams.toString()));

  return res.data;
};

export const fetchPostCount = async <T>(area?: string) => {
  const res = await API.get<T>(API_URL.postArea(area));

  return res.data;
};
