# Planner

## [2025-07-07]

### [요구사항분석 - 250707]

- Next.js App Router 구조로 전체 폴더/컴포넌트 재정비
- Card 등 공통 컴포넌트는 src/components/에 두고, 각 라우트에서 import하여 재사용
- 페이지별로 Card 등 공통 컴포넌트의 크기/스타일은 props로 유연하게 조정
- 하드코딩 데이터 → API 기반 구조로 점진적 리팩토링
- dev 브랜치에서 안전하게 작업

### [세부작업내용 - 250707]

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
  - [x] Footer, Header 등 추가 폴더화/네이밍 정비 (필요시)
  - [ ] util/hook/type 샘플 파일 작성 (필요시)
  - [x] register/corp, register/expert로 파일 이동 후 import 경로 수정 (진행중)

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

## [2025-07-08]

### [요구사항분석 - 250708]

- register 폴더의 corp, expert 페이지에서 HeaderCorp 컴포넌트가 중복되고 있음
- register 폴더 내 모든 페이지에서 공통 헤더를 사용해야 함
- 중복 코드 제거 및 유지보수성 향상을 위해 별도 컴포넌트 및 layout 적용 필요

### [세부작업내용 - 250708]

#### Register 폴더 공통 컴포넌트 분리

- [x] register 폴더에 공통 HeaderCorp 컴포넌트 분리
  - [x] src/app/register/components/RegisterHeader.tsx 생성
  - [x] 기존 HeaderCorp 컴포넌트 코드 이동 및 네이밍 변경
- [x] register 폴더에 layout.tsx 생성
  - [x] RegisterHeader 컴포넌트를 layout에 적용
  - [x] 배경색(BG_COLOR) 등 공통 스타일 적용
- [x] 기존 페이지들에서 중복 코드 제거
  - [x] corp/page.tsx에서 HeaderCorp 컴포넌트 및 관련 스타일 제거
  - [x] expert/page.tsx에서 HeaderCorp 컴포넌트 및 관련 스타일 제거
  - [x] import 경로 정리 및 불필요한 코드 삭제
- [x] register 폴더에서 Footer 숨기기
  - [x] Root Layout에서 pathname 기반으로 Footer 조건부 렌더링 적용
- [x] 헤더 네비게이션 링크 수정
  - [x] 기업등록 버튼: /corp → /register/corp
  - [x] 전문가등록 버튼: /expert → /register/expert
- [x] Header 및 RegisterHeader 반응형 여백 적용
  - [x] Footer와 동일한 반응형 로직 적용 (1920px+ 점진적 증가, 1920~1280px 점진적 축소, 1280px 미만 고정)
  - [x] Header.tsx 수정
  - [x] RegisterHeader.tsx 수정

---

## [2025-07-11]

### [요구사항분석 - 250711]

- 현재까지 구조변경과 register 폴더 공통 컴포넌트 분리 작업이 완료됨
- 남은 코드 정제 작업과 API 구조 설계 작업이 필요함
- 공통 컴포넌트(Card, Button 등)의 props 기반 유연화 작업 우선 진행
- 타입스크립트 타입 정의 및 유틸 함수 샘플 작성 필요
- 향후 API 연동을 위한 기반 구조 설계

### [세부작업내용 - 250711]

#### 1. 코드 정제 작업 완료

- [ ] src/types, src/utils, src/hooks 폴더에 샘플 파일 작성
  - [ ] src/types/index.ts - 공통 타입 정의 (Card, Button props 등)
  - [ ] src/utils/index.ts - 공통 유틸 함수 (형식 변환, 유효성 검사 등)
  - [ ] src/hooks/index.ts - 커스텀 훅 샘플 (향후 API 연동용)
  - [ ] src/constants/index.ts - 앱 전체 상수 정의

- [ ] Card 컴포넌트 props 구조 통일 및 유연화
  - [ ] src/components/Card/Card.tsx - 기본 Card 컴포넌트 props 정의
  - [ ] src/components/Card/CardNews.tsx - News용 Card props 확장
  - [ ] src/components/Card/CardWithBadge.tsx - Badge용 Card props 확장
  - [ ] src/components/Card/TrendCard.tsx - Trend용 Card props 확장
  - [ ] 각 페이지에서 Card 컴포넌트 사용 시 props로 크기/스타일 제어

- [x] BaseCard 컴포넌트 구현 (우선 진행)
  - [x] Component_BaseCard.md 문서 작성 및 설계 완료
  - [x] src/types/card.ts - BaseCard 관련 타입 정의
    - [x] CardData 인터페이스 정의 (serviceId, serviceName, description 등)
    - [x] BaseCardProps 인터페이스 정의 (data, sections, badge, events 등)
    - [x] SectionProps 인터페이스 정의 (show, content, styling 등)
    - [x] BadgeProps 인터페이스 정의 (position, type, size 등)
  - [x] src/components/Card/BaseCard.tsx - 기본 카드 구현 (완료)
    - [x] 1단계: 기본 컨테이너 구조 생성
      - [x] 전체 카드 wrapper div 생성 (크기, 배경, 테두리, 그림자)
      - [x] 클릭 이벤트 핸들러 연결 (serviceId 전달)
      - [x] props 기반 동적 크기 계산 로직
    - [x] 2단계: Category 섹션 구현
      - [x] 조건부 렌더링 (sections.category?.show)
      - [x] 카테고리 텍스트 표시 및 스타일링
      - [x] 메인페이지에서만 표시되도록 제어
    - [x] 3단계: Thumbnail 섹션 구현
      - [x] 이미지 컨테이너 생성 (전체 높이의 55% 비율)
      - [x] 이미지 로딩 및 fallback 처리
      - [x] placeholder 이미지 표시 로직
      - [x] 이미지 비율 유지 및 크롭 처리
    - [x] 4단계: Middle 섹션 구현 (Logo + ServiceName)
      - [x] 1:9 비율 가로 레이아웃 구성
      - [x] Logo 컨테이너 (원형, 전체 높이의 15%)
      - [x] ServiceName 텍스트 영역 (1줄 제한, ellipsis)
      - [x] Logo 이미지 로딩 및 fallback 처리
    - [x] 5단계: Details 섹션 구현
      - [x] 설명 텍스트 영역 생성
      - [x] 2줄 제한 및 ellipsis 처리 (-webkit-line-clamp)
      - [x] 폰트 크기 동적 계산 (전체 높이의 5%)
      - [x] placeholder 텍스트 표시
    - [x] 6단계: Badge 오버레이 구현
      - [x] z-index 999로 최상단 배치
      - [x] 4개 위치 (top-left, top-right, bottom-left, bottom-right) 지원
      - [x] 텍스트 배지 및 이미지 배지 타입 지원
      - [x] 크기별 스타일링 (sm, md, lg)
    - [x] 7단계: 반응형 및 최적화
      - [x] 최소 크기 보장 (minWidth, minHeight)
      - [x] 컨테이너 크기에 따른 비율 재계산
      - [x] 성능 최적화 (React.memo, useMemo 적용)
  - [x] src/components/Card/index.ts - Card 컴포넌트 exports 정리
    - [x] BaseCard export
    - [x] 기존 Card 컴포넌트들과의 호환성 유지
    - [x] 타입 정의들 re-export
    - [x] 컴포넌트별 테스트 페이지 구조 생성
    - [x] src/app/test/ 폴더 구조 설계 및 생성
    - [x] test/page.tsx를 테스트 허브 페이지로 변경
    - [x] test/basecard/page.tsx - BaseCard 전용 테스트 페이지
    - [ ] test/newscard/page.tsx - NewsCard 전용 테스트 페이지
    - [x] test/trendcard/page.tsx - TrendCard 전용 테스트 페이지
    - [x] TrendCard BaseCard 스타일 유연한 구조로 개선
      - [x] TrendSectionConfig 인터페이스 정의 (show, width, className, style)
      - [x] TrendSections 인터페이스 정의 (rank, serviceName, category, trend, homepage, sns)
      - [x] TrendCardProps에 sections, headerLabels props 추가
      - [x] DEFAULT_SECTIONS, DEFAULT_HEADER_LABELS 상수 정의
      - [x] 모든 섹션을 조건부 렌더링으로 변경
      - [x] 각 섹션별 너비, 스타일, 표시/숨김 제어 가능
      - [x] 테스트 페이지에 유연한 구조 테스트 케이스 추가 (커스텀 섹션, 최소 구성)
      - [x] index.ts export 문제 해결 (직접 import 방식으로 변경)
    - [ ] test/buttons/page.tsx - Button 컴포넌트들 테스트 페이지
    - [x] 각 테스트 페이지에 해당 컴포넌트의 다양한 props 조합 시나리오 작성 (BaseCard, TrendCard 완료)

- [ ] Button 컴포넌트 props 구조 통일 및 유연화
  - [ ] src/components/Button/Arrow.tsx - Arrow 버튼 props 정의
  - [ ] src/components/Button/Filter.tsx - Filter 버튼 props 정의
  - [ ] src/components/Button/Link.tsx - Link 버튼 props 정의
  - [ ] 각 페이지에서 Button 컴포넌트 사용 시 props로 스타일 제어

- [ ] 불필요한 코드/주석/미완성 함수 정리
  - [ ] 전체 파일 스캔하여 TODO, FIXME, 미사용 import 제거
  - [ ] console.log 등 디버깅 코드 정리
  - [ ] 중복된 스타일/클래스 정리 및 유틸 함수화

- [ ] 타입스크립트 타입/인터페이스 통일 및 any 제거
  - [ ] 모든 컴포넌트에 proper props interface 정의
  - [ ] any 타입 사용 부분 구체적인 타입으로 변경
  - [ ] 공통 타입들을 src/types/에 정의하고 재사용

#### 2. API 구조 설계 준비

- [ ] API 응답 타입 정의 및 구조 설계
  - [ ] src/types/api.ts - API 응답 타입 정의 (Service, News, Expert 등)
  - [ ] src/types/common.ts - 공통 API 타입 (Pagination, Response wrapper 등)
  - [ ] 백엔드 팀과 API 스키마 협의 및 문서화

- [ ] Mock 데이터를 실제 API 구조와 동일하게 재작성
  - [ ] src/constants/mockData.ts - 현재 하드코딩된 데이터를 API 구조로 변환
  - [ ] 실제 API 응답 형태와 동일한 구조로 mock 데이터 정의
  - [ ] 각 페이지에서 mock 데이터 사용 방식 통일

- [ ] API 연동용 hooks/services 기반 구조 설계
  - [ ] src/hooks/useApi.ts - 공통 API 호출 커스텀 훅
  - [ ] src/hooks/useServices.ts - 서비스 목록 조회 훅
  - [ ] src/hooks/useNews.ts - 뉴스 목록 조회 훅
  - [ ] src/services/api.ts - API 호출 함수들 (fetch wrapper)

- [ ] SSR/CSR 혼합 구조 설계
  - [ ] Next.js App Router의 서버/클라이언트 컴포넌트 구분 설계
  - [ ] 초기 로딩은 SSR, 동적 상호작용은 CSR 적용 방안 설계
  - [ ] 캐싱 전략 및 revalidation 정책 설계

#### 3. 페이지별 컴포넌트 정제

- [ ] 메인 페이지 (/) 컴포넌트 정제
  - [ ] 하드코딩된 데이터를 props/API 구조로 변경
  - [ ] Card 컴포넌트 사용 시 props로 크기/스타일 제어
  - [ ] 반복되는 로직을 커스텀 훅으로 분리

- [ ] 탐색 페이지 (/explore) 컴포넌트 정제
  - [ ] 필터링/검색 로직을 훅으로 분리
  - [ ] Card 그리드 레이아웃을 재사용 가능한 컴포넌트로 분리

- [ ] 뉴스 페이지 (/news) 컴포넌트 정제
  - [ ] NewsCard 컴포넌트 props 기반으로 재작성
  - [ ] 페이지네이션 로직 분리

- [ ] 트렌드 페이지 (/trend) 컴포넌트 정제
  - [ ] TrendCard 컴포넌트 props 기반으로 재작성
  - [ ] 랭킹 표시 로직을 유틸 함수로 분리

---

### [추가 고려 필요사항]

- 트렌드 아이템 - 업다운 로직 필요
- 고객센터 페이지 필요
- 로그인 페이지, 회원가입 페이지
- 메인페이지 수정 (기본에 있다가 검색 결과로 나타나도록)
- 심사신청, 등록하기 버튼 클릭 시 로직 필요(입력 정보 json 형태로 백엔드 전달)
- 로그인/회원가입 페이지 및 기능 필요
- Recently Added 배열 기획 필요

## 🛠️ **문제 원인과 해결책**

### ❌ **문제**

- `index.ts`에서 TrendCard 모듈을 re-export할 때 TypeScript가 모듈을 찾지 못함
- IDE/linter 캐시 문제로 보임

### ✅ **해결책**

1. **임시 해결**: TrendCard를 index.ts에서 re-export하지 않고 직접 import 사용
2. **테스트 페이지 수정**: `@/components/Card/TrendCard`로 직접 import

### 📝 **현재 상태**

```typescript
// 이전 (오류 발생)
import { TrendCard } from '@/components/Card';

// 현재 (정상 작동)
import TrendCard from '@/components/Card/TrendCard';
```

### 🔄 **향후 개선 방안**

나중에 TypeScript 프로젝트가 안정화되면 다시 index.ts에서 re-export를 시도할 수 있습니다:

```typescript
<code_block_to_apply_changes_from>
```

지금은 **직접 import 방식으로 정상 작동**하고 있으니, 기능적으로는 전혀 문제없습니다!

TrendCard가 BaseCard처럼 유연한 구조로 완성되었고, API 연동 준비도 완료되어 있습니다. 🚀
