import {
  homeHandler,
  joinHandler,
  loginHandler,
  myPostsHandler,
  postHandler,
  profileHandler,
} from '.';

export const handlerMap = [
  {
    test: (pathname: string) => pathname === '/',
    handler: homeHandler,
  },
  {
    test: (pathname: string) => pathname.startsWith('/join'),
    handler: joinHandler,
  },
  {
    test: (pathname: string) => pathname.startsWith('/login'),
    handler: loginHandler,
  },
  {
    test: (pathname: string) => pathname.startsWith('/my-posts'),
    handler: myPostsHandler,
  },
  {
    test: (pathname: string) => pathname.startsWith('/post'),
    handler: postHandler,
  },
  {
    test: (pathname: string) => pathname.startsWith('/user/profile'),
    handler: profileHandler,
  },
];
