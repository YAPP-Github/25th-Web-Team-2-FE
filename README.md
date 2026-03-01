

<img width="922" alt="image" src="https://github.com/user-attachments/assets/4936199c-cdbe-4fff-b119-b8cfdbe02544" />

## 서비스 소개

**🔬 연구자**

연구 참여자 모집이 어렵다면?<br/>그라밋에 공고를 등록하면 모집 대상에게 자동으로 메일이 발송돼요.

**💰 참여자**

가까운 실험에 참여해 용돈을 벌고 싶다면?<br/>내 조건에 맞는 실험만 모아보고 메일로 추천받으세요.

| 연구자 | 참여자 |
|:-:|:-:|
|<img width="460" alt="image" src="https://github.com/user-attachments/assets/5947cb79-37d5-498b-8cb0-e88fb5978517" />|<img width="470" alt="image" src="https://github.com/user-attachments/assets/9a919531-c597-46cc-a38a-86191c390692" />|


## 디렉토리 구조

- 페이지 단위로 파일 분리
- 페이지 내에서만 사용되는 경우, 페이지 하위에 `/utils`, `/types`, `/constants` 디렉토리 분리
- 페이지 하위에 `components`, `hooks` 디렉토리 생성 후 하위에서 공용으로 관리

```bash
📦 src
 ┣ 📂 apis                     # API 호출 및 관련 설정 관리
 ┃ ┣ 📜 config.ts              # API 기본 설정 (ex: baseURL, Axios instance)
 ┃ ┗ 📜 exampleapi.ts          # 예시 API 정의 (ex: 로그인, 데이터 조회)
 ┣ 📂 app
 ┃ ┣ 📂 example                # 페이지를 정의한 폴더 (폴더 이름이 각 라우트와 대응)
 ┃ ┃ ┣ 📂 components           # 해당 페이지에서만 사용하는 컴포넌트
 ┃ ┃ ┃ ┣ 📂 ExampleComponent
 ┃ ┃ ┃ ┃ ┣ 📜 ExampleComponent.tsx
 ┃ ┃ ┃ ┃ ┗ 📜 ExampleComponent.css.ts   # Vanilla Extract 스타일
 ┃ ┃ ┣ 📂 hooks                # 해당 페이지 전용 커스텀 훅
 ┃ ┃ ┣ 📂 utils                # 해당 페이지 전용 유틸 (파일 단위 분리)
 ┃ ┃ ┣ 📂 types                # 해당 페이지 전용 타입
 ┃ ┃ ┣ 📂 constants            # 해당 페이지 전용 상수
 ┃ ┃ ┣ 📜 layout.tsx           # 페이지 공통 레이아웃
 ┃ ┃ ┗ 📜 page.tsx             # 해당 페이지 엔트리 파일
 ┣ 📂 assets                   # 정적 자산 (이미지 등) 관리
 ┣ 📂 components               # 공통 UI 컴포넌트 관리
 ┣ 📂 constants                # 프로젝트 전역에서 사용하는 상수
 ┣ 📂 styles                   # 스타일 관련 설정 및 글로벌 테마
 ┗ 📂 types                    # 전역 타입 정의
```

## 기술 스택

- Typescript
- Next.js (14.2.25)
- Tanstack Query
- React Hook Form
- Zod
- Radix UI

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1744528403802?alt=media&token=68465240-657e-4e55-a9f3-fcdc744d1b11)](https://github.com/msdio/stackticon)
