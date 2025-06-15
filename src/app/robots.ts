import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/login', '/join/*', '/my-posts', '/upload', '/user/*'],
    },
    sitemap: 'https://gradmeet.co.kr/sitemap.xml',
  };
}
