# BaseCard 컴포넌트 설계 문서

## 📋 개요

BaseCard는 서비스 카드를 표시하기 위한 기본 컴포넌트입니다. 메인 페이지와 탐색 페이지에서 AI 서비스 정보를 일관된 형태로 보여주며, 확장 가능한 구조로 설계되었습니다.

## 🏗️ 컴포넌트 구조

### 전체 카드 레이아웃

```plaintext
┌─────────────────────────────┐
│    Category 섹션             │
├─────────────────────────────┤
│  [Badge]                    │ ← Badge는 z-index 최상단 오버레이
│      Thumbnail 섹션          │ ← 서비스 결과물 이미지
│                             │
├─────────────────────────────┤
│ Logo 섹션 | ServiceName 섹션 │ ← 1:9 비율로 가로 배치
├─────────────────────────────┤
│        Details 섹션          │ ← 서비스 설명 (2줄 제한)
└─────────────────────────────┘
```

### 섹션별 역할

#### 1. **Category 섹션** (메인 페이지에만 표시)

- 서비스 카테고리 표시 (예: "AI 챗봇", "이미지 생성")
- 상단에 위치하여 서비스 분류를 명확히 구분

#### 2. **Thumbnail 섹션**

- 서비스 사용 결과물 이미지 표시
- 카드 전체 높이의 55% 비율
- 사용자가 서비스 결과를 직관적으로 파악 가능

#### 3. **Middle 섹션** (Logo + ServiceName)

- **Logo**: 회사/브랜드 로고 (1:9 비율 중 1)
- **ServiceName**: 서비스 제목 (1:9 비율 중 9)
- 가로로 나란히 배치되어 브랜드 인식성 향상

#### 4. **Details 섹션**

- 서비스 간단 설명
- 최대 2줄로 제한, 넘치면 ellipsis(...) 처리
- 사용자가 서비스 내용을 빠르게 파악

#### 5. **Badge 오버레이**

- 전체 카드 위에 떠있는 요소 (z-index: 999)
- 위치: top-left, top-right, bottom-left, bottom-right
- 텍스트 배지 또는 이미지 광고 배지 지원

## 📊 데이터 구조

### DB 연동 기반 설계

```typescript
interface CardData {
  // PK (내부 관리용, UI 표시 안함)
  serviceId: number;           // ai_services.id

  // 화면 표시용 데이터
  serviceName: string;         // ai_name
  description: string;         // ai_description
  categoryName?: string;       // category_name (메인페이지만)
  thumbnailUrl: string;        // content_url (thumbnail)
  logoUrl?: string;           // content_url (logo)
}
```

### 클릭 이벤트 플로우

```plaintext
Card 클릭
→ onCardClick(serviceId) 호출
→ 부모 컴포넌트에서 API 호출: /api/services/${serviceId}
→ SelectedItem 모달 오픈 + 상세 데이터 표시
```

## 🎨 스타일링 특징

### 반응형 크기 조정

- 부모 컨테이너가 그리드/레이아웃 담당
- Card는 할당된 공간을 100% 채우는 방식
- 비율 기반 자동 계산으로 일관된 디자인 유지

### 비율 기반 요소 크기

- **Thumbnail**: 전체 높이의 55%
- **Logo**: 전체 높이의 15% (원형)
- **ServiceName**: 전체 높이의 7% 폰트
- **Details**: 전체 높이의 5% 폰트, 최대 2줄

### 오버플로우 처리

- **ServiceName**: 1줄 제한, 넘치면 ellipsis
- **Details**: 2줄 제한, 넘치면 ellipsis
- **최소 크기 보장**: minWidth, minHeight 설정으로 가독성 확보

## 🔧 기술적 구현

### Props 구조

```typescript
interface BaseCardProps {
  // 필수 데이터
  data: CardData;

  // 크기 조정
  size?: number | { width: number; height: number };
  minWidth?: number;
  minHeight?: number;

  // 섹션 표시 여부
  sections: {
    category?: { show: boolean; content?: string };
    thumbnail: { show: boolean };
    logo?: { show: boolean };
    serviceName: { show: boolean };
    details: { show: boolean };
  };

  // Badge 오버레이
  badge?: {
    content: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    type: 'text' | 'image';
    size: 'sm' | 'md' | 'lg';
  };

  // 이벤트 핸들러
  onCardClick?: (serviceId: number) => void;

  // 스타일 커스터마이징
  className?: string;
  style?: React.CSSProperties;
}
```

### 확장 컴포넌트 지원

BaseCard를 기반으로 특화된 컴포넌트들을 생성:

- **NewsCard**: BaseCard + 뉴스 특화 스타일
- **TrendCard**: BaseCard + 랭킹 표시 기능
- **ExpertCard**: BaseCard + 전문가 정보 표시

## 📱 사용 시나리오

### 메인 페이지

```typescript
<BaseCard
  data={{
    serviceId: 1,
    serviceName: "ChatGPT",
    description: "AI 기반 대화형 챗봇 서비스",
    categoryName: "AI 챗봇",
    thumbnailUrl: "/images/chatgpt-result.jpg",
    logoUrl: "/images/openai-logo.png"
  }}
  sections={{
    category: { show: true },
    thumbnail: { show: true },
    logo: { show: true },
    serviceName: { show: true },
    details: { show: true }
  }}
  onCardClick={(id) => openServiceDetail(id)}
/>
```

### 탐색 페이지

```typescript
<BaseCard
  data={serviceData}
  sections={{
    category: { show: false },  // 탐색 페이지에서는 카테고리 숨김
    thumbnail: { show: true },
    logo: { show: true },
    serviceName: { show: true },
    details: { show: true }
  }}
  badge={{
    content: "NEW",
    position: "top-right",
    type: "text",
    size: "sm"
  }}
  onCardClick={(id) => openServiceDetail(id)}
/>
```

## 🚀 개발 우선순위

1. **기본 구조 구현**: 섹션별 레이아웃 및 비율 설정
2. **데이터 바인딩**: props로 받은 데이터 표시
3. **플레이스홀더 처리**: 데이터 없을 때 기본값 표시
4. **클릭 이벤트**: serviceId 전달 및 모달 연동
5. **Badge 오버레이**: z-index 기반 위치 설정
6. **반응형 최적화**: 다양한 화면 크기 대응
7. **타입 안전성**: TypeScript 타입 정의 완성

## 🔍 추후 확장 계획

- **애니메이션**: 호버 효과, 클릭 애니메이션
- **접근성**: ARIA 라벨, 키보드 네비게이션
- **성능 최적화**: 이미지 lazy loading, 메모이제이션
- **테마 지원**: 다크모드, 커스텀 테마
- **A/B 테스트**: 다양한 레이아웃 변형 지원

## 썸네일 이미지 권장 사이즈

- **비율**: 카드 전체 높이의 55%
- **권장 해상도**:
  - **16:9 비율** (가로형) - 1600x900px 또는 800x450px
  - **4:3 비율** (표준형) - 1200x900px 또는 800x600px
  - **1:1 비율** (정사각형) - 800x800px

## 로고 이미지 권장 사이즈

- **비율**: 카드 전체 높이의 15% (정사각형)
- **권장 해상도**:
  - **512x512px** (고화질)
  - **256x256px** (표준)
  - **128x128px** (최소)

## 사용자 가이드라인

### 📸 썸네일 이미지 업로드 가이드

```plaintext
✅ 권장 사이즈: 800x450px (16:9 비율)
✅ 최대 파일 크기: 2MB 이하
✅ 지원 형식: JPG, PNG, WebP
✅ 품질: 선명하고 서비스를 잘 보여주는 이미지
```

### 🏢 로고 이미지 업로드 가이드

```plaintext
✅ 권장 사이즈: 256x256px (정사각형)
✅ 최대 파일 크기: 500KB 이하
✅ 지원 형식: PNG (투명 배경 권장), JPG
✅ 품질: 깔끔하고 읽기 쉬운 로고
```

이런 가이드라인을 서비스 등록/수정 페이지에 안내하면 사용자들이 최적의 이미지를 업로드할 수 있을 것 같습니다.

이 내용을 문서화하거나 실제 업로드 페이지에 적용해보실까요?
