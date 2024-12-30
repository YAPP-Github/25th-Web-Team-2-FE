import { http, HttpResponse } from 'msw';
import TEST_DATA from '../data/test.json';

const fetchHandler = () => {
  return HttpResponse.json(TEST_DATA);
};

export const handlers = [http.get('/api/test', fetchHandler)];
