import { serializeJsonLd } from '@utils/serializeJsonLd';

import { fetchExperimentPost } from './server/fetchExperimentPost';
import { getPostJsonLd } from './server/getPostJsonLd';
import { getPostMetadata } from './server/getPostMetadata';

interface PostLayoutProps {
  children: React.ReactNode;
  params: { postId: string };
}

// desktop·mobile 공통 상위 레이아웃: 공고의 검색 메타데이터와 구조화 데이터를 한 곳에서 관리합니다.
export async function generateMetadata({ params }: Pick<PostLayoutProps, 'params'>) {
  return getPostMetadata(params.postId);
}

async function loadPostJsonLd(postId: string) {
  try {
    const { postDetailData } = await fetchExperimentPost(postId);
    return serializeJsonLd(getPostJsonLd(postDetailData));
  } catch {
    // 공고 없음·요청 실패는 하위 page 와 error.tsx 가 처리하므로 여기서는 구조화 데이터만 생략합니다.
    return null;
  }
}

export default async function PostLayout({ children, params }: PostLayoutProps) {
  const jsonLd = await loadPostJsonLd(params.postId);

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      {children}
    </>
  );
}
