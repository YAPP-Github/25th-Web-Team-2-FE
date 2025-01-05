import { Post } from '@/types/post';
import { API } from './config';
import { API_URL } from '@/constants/url';

interface PostResponse {
  posts: Post[];
}

export const fetchPostList = async () => {
  const res = await API.get<PostResponse>(API_URL.postList);

  return res.data.posts;
};
