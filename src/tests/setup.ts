import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { expect, afterEach, vi } from 'vitest';

// jest-dom matchers를 vitest expect에 확장
expect.extend(matchers);

// 각 테스트 후 정리
afterEach(() => {
  cleanup();
});

// JSDOM 폴리필 추가
Object.defineProperty(Element.prototype, 'hasPointerCapture', {
  value: vi.fn().mockReturnValue(false),
  writable: true,
});

Object.defineProperty(Element.prototype, 'setPointerCapture', {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(Element.prototype, 'releasePointerCapture', {
  value: vi.fn(),
  writable: true,
});

Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

// 공통 모킹 설정
const mockSearchParams = new URLSearchParams();

// useQueryParams 모킹
vi.mock('@/app/home/hooks/useQueryParams', () => ({
  default: () => ({
    searchParams: new URLSearchParams(mockSearchParams),
    updateURLParams: vi.fn((newParams: URLSearchParams) => {
      Array.from(mockSearchParams.keys()).forEach((key) => {
        mockSearchParams.delete(key);
      });
      newParams.forEach((value, key) => {
        mockSearchParams.set(key, value);
      });
    }),
  }),
}));

export { mockSearchParams };
