/**
 * JSON-LD 를 <script type="application/ld+json"> 안에 넣을 문자열로 직렬화합니다.
 * `<` 를 이스케이프해 공고 제목 같은 사용자 입력이 스크립트 태그를 닫지 못하게 합니다.
 */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
