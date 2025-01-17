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

export const fetchPostList = async () => {
  const res = await API.get<PostResponse>(API_URL.postList);

  return res.data;
};

export const fetchPostCount = async <T>(area?: string) => {
  const res = await API.get<T>(API_URL.postArea(area));

  return res.data;
};
