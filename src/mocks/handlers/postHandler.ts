import { http, HttpResponse } from 'msw';
import POST_LIST from '../data/postList.json';
import { MOCK_API_URL } from '@/constants/url';
import POST_SUB_AREA from '../data/postSubArea.json';
import POST_AREA from '../data/postArea.json';

const fetchPostListHandler = () => {
  return HttpResponse.json(POST_LIST);
};

const fetchPostAreaHandler = ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const area = url.searchParams.get('area');

  if (area) {
    return HttpResponse.json(POST_SUB_AREA);
  }

  return HttpResponse.json(POST_AREA);
};

export const postHandler = [
  http.get(MOCK_API_URL.postList, fetchPostListHandler),
  http.get(MOCK_API_URL.postArea, fetchPostAreaHandler),
];
