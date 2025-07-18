## Top Trends 섹션 구현 계획 (2025-07-03)

### 요구사항 요약
- 섹션 크기: 1920px(가로) x 420px(세로)
- 좌우 여백: 320px씩, 내부 오브젝트는 이 안에만 배치
- 카드: 1개 270x360px(3:4), 간격 24px, 4개 디스플레이
- 상단 텍스트(카테고리명) + 카드(썸네일, 로고, 서비스명, 해시태그) 1세트, 총 10개 세트, 4개만 표시
- 카테고리: @Merged_Carousel_Main_Category.tsx의 categories 배열 참조
- 캐러셀: 4개씩, 좌/우 화살표, 3초마다 자동 좌측 1칸 이동(부드러운 애니메이션)
- 좌상단 뱃지 없음, 카드 클릭 시 상세페이지 이동 예정(추후)

### 작업 단계
1. TopTrendsSection.tsx 파일 생성 및 기본 레이아웃 구현
2. 카드 데이터/카테고리 구조 설계 및 샘플 데이터 작성
3. 카드 UI(3:4 비율, 썸네일/로고/서비스명/해시태그) 구현
4. 4개 카드 캐러셀 구조 및 애니메이션 구현
5. 좌/우 화살표 이동 및 자동 슬라이드 구현
6. 스타일(여백, 정렬, 반응형 등) 적용
7. 코드 정리 및 커밋

---
진행: 1단계(파일 생성 및 기본 레이아웃)

## Top Step 섹션 구현 계획 (2025-07-03)

### 요구사항 요약
- Top Trends와 구조, 섹션 크기(1920x480), 여백 등 완전 동일
- 상단 텍스트만 "Top 스텝"으로 변경
- 카드 내부는 Placeholder("이미지", "로고", "서비스", "해시태그")로만 표시
- 파일명: TopStepSection.tsx

### 작업 단계
1. TopStepSection.tsx 파일 생성 및 기본 레이아웃 구현
2. 카드 데이터 구조 설계 및 Placeholder 데이터 작성
3. 카드 UI(Placeholder) 구현
4. 4개 카드 캐러셀 구조 및 애니메이션 구현
5. 좌/우 화살표 이동 및 자동 슬라이드 구현
6. 스타일(여백, 정렬, 반응형 등) 적용
7. 코드 정리 및 커밋

# 작업 계획

## 2025-07-03

- 기업등록(기업회원) 페이지 분리 및 헤더 컴포넌트 분리 작업
    1. src/app/corp/ 폴더 생성
    2. src/app/corp/page.tsx 생성 (기업등록 페이지, 좌우 여백 700px 적용)
    3. src/components/Header_Corp.tsx 생성 (기업등록 헤더, 좌우 700px 여백, JK_header.txt 레퍼런스 반영)
    4. 기업등록 페이지에서 Header_Corp 컴포넌트 사용 (Body도 동일 여백 적용)

## [2025-07-03] 기업등록 페이지 body 작업 1단계
- 기업정보 섹션을 page.tsx 내부 함수형 컴포넌트로 구현 시작
- Tailwind로 700px 중앙 고정, 여백 및 레이아웃 신경써서 작성
- 입력 필드, 셀렉트 등은 UI만 우선 구현, 상태/이벤트는 추후 추가

### [2025-07-03] 기업정보 섹션 UI 개선 피드백 반영
- 전체 배경: rgb(245,246,248) 적용
- 섹션(기업정보 등): 흰색 박스, radius/그림자/여백 적용
- 회사명 70%/대표자명 30% 한 행에 배치, 사이 간격 추가
- 별(*) 빨간색(#ff0000) 확실히 적용(placeholder 스타일 보완)

### [2025-07-03] 기업정보 섹션 입력 필드 플로팅 라벨 적용
- 입력창 위 라벨/플로팅 라벨 완전히 제거, placeholder만 사용(포커스/입력 시 사라짐)
- 기업형태 셀렉트 우측에 #d2d2d2 ▼ 아이콘 추가, placeholder는 '기업형태'만(별, '선택' 단어 없음)
- 모든 필드 placeholder 색상 #d2d2d2, 별(*) 미표시
- 피드백 반영

### [2025-07-03] 기업형태 셀렉트 및 placeholder 개선
- 기업형태 placeholder에서 '선택' 글씨 제거
- 셀렉트 우측에 #d2d2d2 ▼ 아이콘 추가
- 기업형태 placeholder(텍스트+별)는 포커스 시 투명, 포커스 해제 시 다시 나타나게 구현
- 피드백 반영

### [2025-07-03] 입력/셀렉트 위에 라벨+빨간 별 적용
- 모든 입력/셀렉트 위에 '필드명 *' 라벨 추가(필드명 #d2d2d2, 별 #ff0000)
- placeholder는 비우거나 예시만
- 피드백 반영

### [2025-07-03] 플로팅 라벨(absolute, 흰색 배경) 스타일 적용
- 모든 입력/셀렉트에 플로팅 라벨(absolute, 흰색 배경, 입력창 테두리와 겹치게) 스타일 적용
- 라벨은 입력창 왼쪽 상단에 겹쳐서 띄우고, 별(*)은 빨간색
- 실무 머티리얼 스타일로 구현
- 피드백 반영

### [2025-07-04] AI 서비스 등록 섹션 작업 계획

2. Company_Register_Page 작업
    - 피그마 Company_Register_Page의 Frame7(확인: MCP) 참고
    - Reference Code: KM_Body.txt
    [ ] AI 서비스 등록 섹션
    [ ] 사업자등록증 제출 섹션
    [ ] AI 담당자 정보 섹션
    [ ] 개인정보 동의 섹션


## [2025-07-04]
### [2025-07-04] 환경 세팅 세부 작업 (윈도우 PC 통일 경험)
- [x] .editorconfig 파일 생성 및 프로젝트 루트에 추가
- [x] .vscode/settings.json 생성 및 포맷터/인텔리센스/탭 등 옵션 통일
- [x] README에 "윈도우 환경 세팅법" 섹션 추가 (Node 버전, 필수 확장, 설치법 등)
- [x] package.json, tailwind.config.ts, .eslintrc 등 설정 최신화
- [x] 필수 VSCode 확장(Tailwind CSS IntelliSense, Prettier, ESLint, EditorConfig) 안내
- [x] Node.js 버전 통일(nvm-windows 등으로 18.x 고정)
- [x] npm ci로 lockfile 기반 패키지 설치 안내
- [x] Tailwind/글로벌 CSS에서 폰트 패밀리, 폰트 스무딩 등 명시
- [x] 브라우저/OS별 폰트/렌더링 차이 최소화 설정
- [x] 환경설정 관련 README/문서화

### [2025-07-04] 메인페이지 리팩토링 세부 계획 (체크박스)
- [x] 기존 page.tsx 파일 백업 및 변경점 기록
- [x] Body_*, TopTrends 등 메인페이지 고유 섹션 컴포넌트 import 코드 삭제(공통 UI인 Header, Footer는 유지)
- [x] 각 섹션 컴포넌트의 JSX/로직을 page.tsx로 복사 및 붙여넣기
- [x] 각 섹션별 state/이벤트 핸들러 page.tsx로 이동 및 통합
- [x] props 전달 코드 제거, 직접 state 연결로 변경
- [x] 공통 UI(버튼, 입력 등)만 별도 컴포넌트로 유지/정리
- [x] 불필요한 컴포넌트/파일 삭제(Body_*, TopTrends 등)
- [x] 전체 페이지 렌더링/동작 확인 (UI/스타일/로직 영향 없는지 체크)
- [x] 타입스크립트 에러/경고 발생 시 최소한의 주석 또는 타입만으로 해결 (UI 영향 없이)
- [x] 코드/구조/스타일 일관성 최종 점검 및 정리

### [2025-07-04] 메인페이지 반응형 구성 세부 계획 (체크박스)
- [x] 전체 레이아웃 컨테이너에 max-width, min-width, padding 등 반응형 기준점 적용
- [x] 1920px 이상 해상도에서 UI(여백, 폰트, 배치 등) 고정 유지
- [x] 1280px ~ 1919px 구간에서 좌우 여백/섹션 크기 자연스럽게 축소

### [2025-07-04] Company_Register_Page 작업
    - 피그마 Company_Register_Page의 Frame7(확인: MCP) 참고
    - Reference Code: KM_Body.txt
- [x] AI 서비스 등록 섹션
- [x] 사업자등록증 제출 섹션
- [x] AI 담당자 정보 섹션
- [x] 개인정보 동의 섹션

### [2025-07-04] Expert_Register_Page 작업 계획
- 피그마 Expert_Register_Page의 (확인: MCP) 참고
- Company_Register_Page 코드 재사용 및 수정
1. 기본 구조 설정
    [x] page.tsx 파일 생성 및 기본 컴포넌트 구조 설정
    [x] Company_Register_Page에서 재사용 가능한 컴포넌트 파악
    [x] 공통 스타일/상수 정의

2. 섹션별 작업 계획
    [x] 헤더 섹션 (Company_Register_Page와 동일)
    [x] SNS 등록 섹션  (Company_Register_Page과 동일)
    [x] 프로필 등록 섹션 (Company_Register_Page 기반 수정)
        - 서비스 이름 -> 전문가 닉네임으로 변경
        - 카테고리/스킬 선택 부분 재사용
    [x] 대표결과물 섹션
        - 업로드 가능 파일 형식 변경 (이미지 파일)
        - 링크입력란
        - 이미지 업로드, 영상 업로드
    [x] 개인정보 동의 섹션 (Company_Register_Page와 동일)

### [2025-07-04] Trend_Page 작업 계획 (Figma MCP 기반)
- [ ] app/trend/page.tsx 생성 및 기본 구조 세팅
- [ ] TrendStepper(큰 파란색 배경/배너, main 내부) 컴포넌트 구현
- [ ] TrendCategoryBar(탭: 일자별/카테고리별/국가별/리뷰별, Top10 카테고리 버튼) 구현
- [ ] TrendRankingTable(표 형태: 서비스명, 카테고리, Up&Down, 홈페이지, SNS) 구현
- [ ] 각 행: 서비스 로고, 서비스명, 카테고리, Up/Down(빨강/파랑), 홈페이지, SNS 아이콘 표시
- [ ] 상단/중앙 배너, 서비스별 로고/썸네일 이미지 적용
- [ ] Footer 컴포넌트 재사용

### [2025-07-04] News 페이지 작업 계획
- [ ] app/news 폴더 생성 및 page.tsx 파일 생성
- [ ] Header 컴포넌트(@Header.tsx) 사용, 고정형(1920px, min 1280px)
- [ ] Footer 컴포넌트(@Footer.tsx) 사용, 고정형(1920px, min 1280px)
- [ ] 헤더/푸터 모두 반응형 아님, 1280~1920px 내 고정
- [ ] 헤더 바로 아래 메인배너(Main_Banner) 삽입 (Trend 페이지와 동일 위치/크기)
- [ ] 배너 Main_Title: "Step Ahead", Detail_Text: "Other Sentence"
- [ ] 추후 News 리스트/상세 등 추가 예정

### [2025-07-04] Category 페이지 무한 스크롤(프론트엔드 더미)
- 요구: 스크롤 하단 도달 시 카드 6개씩 추가 로딩(Intersection Observer)
- cardTestData를 여러 번 append, 추후 API 연동 시 구조 변경 최소화
- (옵션) 로딩 중 표시/더 이상 없음 메시지는 추후 필요 시 추가

#### 작업 단계
1. Intersection Observer로 마지막 카드 감지 로직 추가
2. 6개씩 카드 append (더미 데이터 반복)
3. 추후 API 연동 시 fetch 함수만 교체

---

추가 고려 필요사항
- 고객센터 페이지 필요
- 심사신청, 등록하기 버튼 클릭 시 로직 필요 => 위에 텍스트 박스에 적힌 정보들 json 형태로 백엔드로 전달
- 등록하기 버튼 클릭 시 로직 필요
- 객체지향 적으로 리팩토링
- 로그인 페이지 및 기능 필요
- 회원가입 페이지 및 기능 필요
- Recently Added 배열 기획 필요

### [2025-07-04] jasper_popup.html → SelectedItem.tsx 컴포넌트화
- jasper_popup.html의 구조/스타일을 React 컴포넌트(SelectedItem.tsx)로 변환
- props로 데이터 받아 동적 렌더링, 오버레이/닫기/z-index 등 모달 기능 포함
- 카드 클릭 시 팝업 오픈/닫기 예시 구현(더미 데이터)
- DB 연동은 추후 API 연결 시점에 fetch만 추가 예정

### [2025-07-04] API 연동 작업 계획
- API 엔드포인트: https://web-production-e8790.up.railway.app/api-docs/#/
- [x] useApi 훅 타입 에러 수정 (searchResults.data → searchResults)
- [x] mainApi 응답 타입 수정 (ApiResponse<AIService[]> → AIService[])
- [x] 카테고리 섹션 API 연동 (aiCategoryApi.getAICategories 사용)
- [x] 무한 루프 문제 해결 (useMemo로 categories 메모이제이션)
- [x] React key 중복 경고 해결 (고유한 key 생성)
- [x] 카테고리 데이터 구조 개선 (name, icon 포함)
- [x] API 응답 구조 수정 (categoriesData.categories 사용)
- API 연동을 위한 기본 구조 설정 및 서비스 레이어 구현
- 각 페이지별 API 연동 계획:
  - [x] 메인페이지 API 연동 (AI 서비스, 카테고리 데이터)
  - [ ] 기업등록 페이지 API 연동 (회원가입, 기업정보 등록)
  - [ ] 전문가등록 페이지 API 연동 (회원가입, 프로필 등록)
  - [ ] 트렌드 페이지 API 연동 (랭킹 데이터, 카테고리별 데이터)
  - [ ] 뉴스 페이지 API 연동 (뉴스 목록, 상세)
  - [x] 카테고리 페이지 API 연동 (카테고리별 서비스 목록)
- [x] API 서비스 레이어 구현 (axios/fetch 기반)
- [x] 에러 핸들링 및 로딩 상태 관리
- [x] 환경변수 설정 (.env 파일)
- [x] API 응답 타입 정의 (TypeScript 인터페이스)
- [x] 커스텀 훅 구현 (useApi, useInfiniteApi)
- [x] 실제 API 명세에 맞는 서비스 구현:
  - [x] 사용자 관리 API (userApi)
  - [x] AI 서비스 관리 API (aiServiceApi)
  - [x] AI 서비스 콘텐츠 관리 API (aiServiceContentApi)
  - [x] AI 서비스 태그 관리 API (aiServiceTagApi)
  - [x] AI 카테고리 관리 API (aiCategoryApi)
- [x] 페이지별 API 연동 구현:
  - [x] 메인페이지 - AI 서비스 검색 및 트렌드 데이터 연동
  - [x] 카테고리 페이지 - AI 서비스 목록 및 카테고리 데이터 연동

---

추가 고려 필요사항
