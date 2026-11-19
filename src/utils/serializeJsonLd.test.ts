import { describe, expect, it } from 'vitest';

import { serializeJsonLd } from './serializeJsonLd';

describe('serializeJsonLd', () => {
  it('데이터를 JSON 문자열로 직렬화하고, 파싱하면 원래 값과 같다.', () => {
    const data = [{ '@context': 'https://schema.org', '@type': 'WebSite', name: '그라밋' }];

    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it('사용자 입력에 </script> 가 있어도 스크립트 태그를 닫지 못하도록 < 를 이스케이프한다.', () => {
    const headline = '</script><script>alert(1)</script>';

    const result = serializeJsonLd({ headline });

    expect(result).not.toContain('<');
    expect(result).toContain('\\u003c/script>');
    expect(JSON.parse(result)).toEqual({ headline });
  });
});
