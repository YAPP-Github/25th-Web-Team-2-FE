import { http, HttpResponse } from 'msw';
import POST_LIST from '../data/postList.json';
import { MOCK_API_URL } from '@/constants/url';

const fetchPostListHandler = () => {
  return HttpResponse.json(POST_LIST);
};

export const postHandler = [http.get(MOCK_API_URL.postList, fetchPostListHandler)];
