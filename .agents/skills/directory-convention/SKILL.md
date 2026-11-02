---
name: directory-convention
description: 이 저장소의 README와 실제 파일 구조를 기준으로 새 파일을 둘 디렉터리와 파일 이름 규칙을 결정할 때 사용합니다.
---

# 디렉터리 및 네이밍 컨벤션

새 파일을 만들거나 기존 파일의 위치를 옮길 때 이 스킬을 사용합니다. 먼저 README의 `디렉토리 구조` 설명과 대상 기능의 인접 파일을 확인합니다. 저장소에는 과거 관례가 일부 혼재하므로, 아래 규칙을 기본으로 따르되 가장 가까운 형제 기능의 일관된 패턴을 우선합니다.

## 파일 위치

- 라우트와 페이지 전용 코드는 `src/app/<route>/` 아래에 둡니다. Next.js App Router가 인식하는 파일은 해당 라우트 폴더에 둡니다.
- 라우트 전용 UI는 해당 페이지의 `components/`, 페이지 전용 훅은 `hooks/`에 둡니다. 예: `src/app/upload/components/`, `src/app/upload/hooks/`.
- 데스크톱·모바일 등 표현 방식에 따라 화면이 분리된 기능은 해당 라우트 아래 `desktop/`, `mobile/`로 분리합니다. 화면에 종속된 컴포넌트는 그 화면 하위에 둡니다. 양쪽에서 공유하는 코드는 공통 상위 경로에 둡니다.
- 서버 전용 페이지 로딩 코드는 기능에서 사용하는 `server/` 하위에 둘 수 있습니다. 예: `src/app/post/[postId]/server/`.
- 여러 라우트에서 재사용하는 코드는 전역 목적별 디렉터리에 둡니다.
  - 공통 UI: `src/components/`
  - 공통 React 훅: `src/hooks/`
  - API 호출 및 응답 타입: `src/apis/`
  - Zod 폼·요청 스키마: `src/schema/`
  - 공통 타입: `src/types/`
  - 공통 상수: `src/constants/`
  - 공통 함수: `src/utils/`
  - 인증·로깅 등 런타임 라이브러리: `src/lib/`
  - 전역 스타일: `src/styles/`
  - 이미지 등 정적 에셋: `src/assets/images/`
- 기능 한 곳에서만 쓰는 코드를 전역 디렉터리에 올리지 않습니다. 반대로 여러 기능에서 쓰이는 코드가 특정 페이지 폴더에 묶여 있지 않은지 확인합니다.
- 모킹 자료는 `src/mocks/` 아래에 두고, 공용 테스트 도구와 fixture는 `src/tests/` 아래에 둡니다. 특정 훅·컴포넌트 테스트는 대상과 가까운 `__tests__/` 또는 같은 기능 폴더에 둡니다.

## Next.js 라우트 파일

- 프레임워크 예약 파일의 소문자 이름을 유지합니다: `page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`.
- 동적 라우트 세그먼트는 Next.js 형식을 유지합니다. 예: `[postId]`.
- 라우트 폴더 이름은 기존처럼 소문자 kebab-case를 사용합니다. 예: `my-posts`, `user/profile`.
- sitemap 및 robots 같은 App Router 메타데이터 파일도 프레임워크 예약 이름을 사용합니다: `sitemap.ts`, `robots.ts`.

## 파일 및 식별자 이름

- React 컴포넌트 파일과 컴포넌트 전용 폴더는 PascalCase로 짓습니다. 파일 이름과 기본 export 컴포넌트 이름을 일치시킵니다. 예: `ApplyMethodSection/ApplyMethodSection.tsx`.
- README는 `index.tsx` 규칙을 별도로 정하지 않습니다. 현재 코드를 보면 가입 플로우의 `Researcher/index.tsx`, `Participant/index.tsx`는 하위 단계를 객체로 묶어 내보내는 기능 진입점이고, `src/components/Icon/index.tsx`는 `Icon` 컴포넌트 자체를 구현합니다. 따라서 `index.tsx`를 일괄적인 컴포넌트 파일 규칙으로 보지 말고, 기능 진입점으로 설계했거나 해당 폴더의 기존 공개 모듈 패턴을 따를 때 사용합니다. 일반 컴포넌트는 `ComponentName.tsx`처럼 이름이 드러나는 파일에 둡니다.
- JSX 없이 여러 모듈을 재수출하거나 핸들러 목록을 구성하는 파일은 `index.ts`를 사용합니다. 예: `src/components/Icon/icons/index.ts`, `src/middleware/handlers/index.ts`, `src/mocks/handlers/index.ts`. 새 index 파일을 만들 때는 이름만 편의를 위해 추가하지 말고 해당 폴더가 실제로 하나의 공개 진입점이나 모듈 목록을 제공하는지 확인합니다.
- 컴포넌트 스타일 파일은 컴포넌트와 같은 이름에 `.css.ts`를 붙입니다. 예: `ApplyMethodSection.css.ts`. 이 저장소는 Vanilla Extract를 사용합니다.
- React 훅 파일은 camelCase로 작성하고 `use`로 시작합니다. 예: `useManageExperimentPostForm.tsx`, `useExperimentDate.ts`.
- 페이지 단위 유틸, 타입, 상수 파일은 기존 기능 패턴에 맞춰 `<Feature>.utils.ts`, `<Feature>.types.ts`, `<feature>.constants.ts` 형태를 사용합니다. 예: `JoinPage.utils.ts`, `ExperimentPostPage.types.ts`, `upload.constants.ts`.
- 파일명 규칙이 기능마다 다르면 인접 파일을 확인하고 해당 기능의 관례를 따릅니다. 새 파일 하나를 위해 기존 파일 이름들을 한꺼번에 바꾸지 않습니다.
- 테스트 파일은 대상 이름 뒤에 `.test.ts` 또는 `.test.tsx`를 붙입니다. 관련 코드 가까이 두고, 한 기능의 테스트가 많으면 그 기능 내부에 `__tests__/`를 사용합니다.
- 디렉터리 이름은 기존 상위 구조를 따릅니다: 일반적인 라우트 세그먼트는 kebab-case, React 컴포넌트 단위 폴더는 PascalCase, 분류 폴더는 `components`, `hooks`, `server`, `desktop`, `mobile`, `__tests__`처럼 소문자로 작성합니다.

## 새 파일을 추가하기 전 확인

1. 같은 기능의 기존 파일 위치와 이름을 찾습니다.
2. 파일이 해당 페이지 전용인지 여러 페이지가 공유하는지 결정합니다.
3. 라우트 예약 파일인지 일반 구현 파일인지 구분하고, 예약 파일명은 변경하지 않습니다.
4. 형제 컴포넌트·훅·스타일·테스트의 디렉터리 패턴을 따라갑니다.
5. README에 적힌 페이지 단위 분리 원칙과 실제 저장소 구조가 충돌하면 실제 코드의 가장 가까운 일관된 관례를 따르고, 새 구조를 임의로 만들지 않습니다.
