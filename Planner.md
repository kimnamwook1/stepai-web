# Planner

## [2024-07-07]

### [요구사항분석]

- Next.js App Router 구조로 전체 폴더/컴포넌트 재정비
- Card 등 공통 컴포넌트는 src/components/에 두고, 각 라우트에서 import하여 재사용
- 페이지별로 Card 등 공통 컴포넌트의 크기/스타일은 props로 유연하게 조정
- 하드코딩 데이터 → API 기반 구조로 점진적 리팩토링
- dev 브랜치에서 안전하게 작업

### [세부작업내용]

#### 1. 구조변경

- [x] dev 브랜치 생성 및 환경 분리
- [ ] 기존 폴더/파일 구조 분석 및 개선안 설계
  - [x] app/ 폴더 내 라우트별 폴더 구조 정비
  - [x] src/components/에 Card, Header, Footer 등 공통 컴포넌트 이동 및 props 기반 유연화
  - [x] 도메인 특화 컴포넌트만 app/xxx/components/에 배치
  - [x] src/components/Button, Card 등 폴더 생성 및 파일 이동
  - [x] Main_Banner → MainBanner, SelectedItem 폴더화 등 PascalCase 네이밍 통일
  - [x] import 경로 전체 일괄 수정 (app, components 등)
  - [x] src/hooks, src/types, src/utils, src/constants 폴더 신설
  - [x] SelectedItem 등 폴더화 및 import 경로 정비
  - [x] Footer 구조 리팩토링(3섹션, 반응형, 점선 border)
  - [x] Footer를 layout.tsx에서 공통 적용
  - [x] 각 page에서 Footer import/사용 코드 일괄 삭제(중복 제거)
  - [ ] Footer, Header 등 추가 폴더화/네이밍 정비 (필요시)
  - [ ] util/hook/type 샘플 파일 작성 (필요시)
  - [ ] register/corp, register/expert로 파일 이동 후 import 경로 수정 (진행중)

#### 2. 코드 정제

- [ ] 불필요한 코드/주석/미완성 함수 정리
- [ ] Card 등 공통 컴포넌트의 props 구조 통일 및 타입 명확화
- [ ] 각 페이지별로 Card 등 공통 컴포넌트의 크기/스타일을 props로 제어하도록 개선
- [ ] 중복 코드/스타일 제거 및 유틸 함수화
- [ ] 타입스크립트 타입/인터페이스 통일 및 any 제거

#### 3. API 구조

- [ ] types/ 폴더에 API 응답 타입 정의 및 백엔드와 협의
- [ ] mock 데이터도 실제 API 구조와 동일하게 작성
- [ ] API 연동용 hooks/services 분리 (예: useFetchServices, api.ts 등)
- [ ] SSR/CSR 혼합 fetch 구조 설계 및 적용
- [ ] 실제 API 연동 시 최소한의 코드 변경으로 전환 가능하도록 설계

---

### [추가 고려 필요사항]

- 고객센터 페이지 필요
- 로그인 페이지, 회원가입 페이지
- 메인페이지 수정 (기본에 있다가 검색 결과로 나타나도록)
- 심사신청, 등록하기 버튼 클릭 시 로직 필요(입력 정보 json 형태로 백엔드 전달)
- 로그인/회원가입 페이지 및 기능 필요
- Recently Added 배열 기획 필요
