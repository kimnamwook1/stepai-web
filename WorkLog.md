# Work Log

## Work Log 2025-01-15-14-30

- **Task**: Register 폴더 공통 컴포넌트 분리 및 레이아웃 적용
- **Status**: 완료

---

### 🔧 Code Changes

#### 14:30 - 공통 헤더 컴포넌트 분리

**Action:** 생성
**File:** `src/app/register/components/RegisterHeader.tsx`

**Changes Made:**

- corp/page.tsx와 expert/page.tsx에서 중복되던 HeaderCorp 컴포넌트를 분리
- RegisterHeader로 네이밍 변경 및 독립적인 컴포넌트로 생성
- useRouter 훅을 사용한 네비게이션 기능 포함
- docstring 추가로 문서화

**Code Diff:**

```typescript
// Before
// corp/page.tsx와 expert/page.tsx에서 각각 동일한 HeaderCorp 함수 중복

// After
"use client";

import React from "react";
import { useRouter } from "next/navigation";

/**
 * Register 폴더에서 사용하는 공통 헤더 컴포넌트
 * 홈과 고객센터 링크를 포함한 간단한 네비게이션 제공
 */
function RegisterHeader() {
    const router = useRouter();
    // ... 헤더 구현
}

export default RegisterHeader;
```

#### 14:35 - Register 레이아웃 생성

**Action:** 생성
**File:** `src/app/register/layout.tsx`

**Changes Made:**

- register 폴더의 공통 레이아웃 생성
- RegisterHeader 컴포넌트 자동 적용
- 배경색(rgb(245,246,248)) 공통 적용
- minHeight: 100vh로 전체 화면 활용

**Code Diff:**

```typescript
// Before
// 각 페이지에서 개별적으로 헤더와 배경색 적용

// After
import RegisterHeader from "./components/RegisterHeader";

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ background: 'rgb(245,246,248)', minHeight: '100vh' }}>
            <RegisterHeader />
            {children}
        </div>
    );
}
```

#### 14:40 - 중복 코드 제거

**Action:** 수정
**File:** `src/app/register/corp/page.tsx`, `src/app/register/expert/page.tsx`

**Changes Made:**

- HeaderCorp 컴포넌트 함수 제거
- BG_COLOR 상수 제거
- useRouter import 제거
- 불필요한 div 래퍼와 헤더 호출 제거
- 페이지 구조를 main 태그로 단순화

**Code Diff:**

```typescript
// Before
const CorpRegisterPage = () => {
    return (
        <div style={{ background: BG_COLOR, minHeight: '100vh' }}>
            <HeaderCorp />
            <main className="max-w-[700px] mx-auto my-8 p-4">
                {/* content */}
            </main>
        </div>
    );
};

// After
const CorpRegisterPage = () => {
    return (
        <main className="max-w-[700px] mx-auto my-8 p-4">
            {/* content */}
        </main>
    );
};
```

#### 14:50 - Footer 조건부 렌더링

**Action:** 생성/수정
**File:** `src/components/ConditionalFooter.tsx`, `src/app/layout.tsx`

**Changes Made:**

- ConditionalFooter 컴포넌트 생성
- usePathname 훅으로 현재 경로 확인
- /register 경로에서는 Footer 숨김 처리
- Root Layout에서 기존 Footer를 ConditionalFooter로 교체

**Code Diff:**

```typescript
// Before
<Footer />

// After
"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();
    const shouldShowFooter = !pathname.startsWith("/register");
    return shouldShowFooter ? <Footer /> : null;
}
```

#### 15:00 - 헤더 네비게이션 링크 수정

**Action:** 수정
**File:** `src/components/Header.tsx`

**Changes Made:**

- 기업등록 버튼 링크: /corp → /register/corp
- 전문가등록 버튼 링크: /expert → /register/expert
- 404 에러 해결

**Code Diff:**

```typescript
// Before
onClick={
    item.id === 'company'
        ? () => window.location.href = '/corp'
        : item.id === 'expert'
            ? () => window.location.href = '/expert'
            : undefined
}

// After
onClick={
    item.id === 'company'
        ? () => window.location.href = '/register/corp'
        : item.id === 'expert'
            ? () => window.location.href = '/register/expert'
            : undefined
}
```

##### 📁 File Operations

15:10 - File Management
**Action:** 삭제
**Files:**

- 삭제: `src/app/components/ConditionalFooter.tsx`

**Purpose:** 중복 생성된 파일 제거, 기존 src/components/ 구조 활용

---

### ✨ 완료된 기능

**Description:** Register 폴더 공통 컴포넌트 분리 및 레이아웃 시스템 구축

**Implementation:**

1. 중복 코드 제거 - HeaderCorp 컴포넌트 통합
2. 레이아웃 시스템 구축 - 자동 헤더/배경 적용
3. Footer 조건부 렌더링 - register 페이지에서 Footer 숨김
4. 네비게이션 링크 정정 - 404 에러 해결

**Files Created/Modified:**

- `src/app/register/components/RegisterHeader.tsx` - 새로 생성
- `src/app/register/layout.tsx` - 새로 생성
- `src/components/ConditionalFooter.tsx` - 새로 생성
- `src/app/layout.tsx` - Footer → ConditionalFooter 교체
- `src/components/Header.tsx` - 네비게이션 링크 수정
- `src/app/register/corp/page.tsx` - 중복 코드 제거
- `src/app/register/expert/page.tsx` - 중복 코드 제거

**Benefits:**

- 코드 중복 제거로 유지보수성 향상
- 일관된 레이아웃 시스템으로 UX 개선
- register 플로우에서 Footer 제거로 집중도 향상
- 404 에러 해결로 사용자 경험 개선

---

## Work Log 2025-01-15-15-20

- **Task**: Header 및 RegisterHeader 반응형 여백 적용
- **Status**: 완료

---

### 🔧 Code Changes

#### 15:20 - Header 반응형 여백 적용

**Action:** 수정
**File:** `src/components/Header.tsx`

**Changes Made:**

- 기존 고정 width/padding 방식에서 Footer와 동일한 반응형 로직으로 변경
- 3-section 레이아웃 구조 적용 (좌측여백 + 내용 + 우측여백)
- 화면 크기에 따른 동적 여백 조정
- transition 효과 추가로 부드러운 크기 변화

**Code Diff:**

```typescript
// Before
<header className="bg-white border-b border-gray-100 min-w-[1280px] max-w-[1920px] w-full mx-auto">
    <div className="px-80 py-0 w-full" style={{ width: 1920, minWidth: 1280, maxWidth: 1920 }}>
        <div className="flex items-center justify-between h-[80px] w-full">
            {/* 내용 */}
        </div>
    </div>
</header>

// After
<header className="w-full flex justify-center bg-white border-b border-gray-100">
    <div className="w-full max-w-[3840px] flex">
        {/* 좌측 여백 */}
        <div
            className="hidden md:block transition-all duration-300"
            style={{
                width: 'max(0px, min(1280px, calc(320px + ((100vw - 1920px) / 3))))',
                minWidth: 0,
                flexShrink: 1,
            }}
        />
        {/* 내용 섹션 */}
        <div className="flex-1 flex justify-center">
            <div className="flex items-center justify-between h-[80px] w-full" style={{ maxWidth: 1280 }}>
                {/* 내용 */}
            </div>
        </div>
        {/* 우측 여백 */}
        <div className="hidden md:block transition-all duration-300" style={{ ... }} />
    </div>
</header>
```

#### 15:25 - RegisterHeader 반응형 여백 적용

**Action:** 수정
**File:** `src/app/register/components/RegisterHeader.tsx`

**Changes Made:**

- Header와 동일한 반응형 로직 적용
- 내용 영역은 max-width: 700px 유지 (register 페이지 특성)
- 좌측/우측 여백 동적 조정
- 시각적 일관성 확보

**Code Diff:**

```typescript
// Before
<header className="w-full bg-white shadow">
    <div className="max-w-[700px] mx-auto h-20 flex items-center justify-end px-6">
        {/* 내용 */}
    </div>
</header>

// After
<header className="w-full flex justify-center bg-white shadow">
    <div className="w-full max-w-[3840px] flex">
        {/* 좌측 여백 */}
        <div className="hidden md:block transition-all duration-300" style={{ ... }} />
        {/* 내용 섹션 */}
        <div className="flex-1 flex justify-center">
            <div className="max-w-[700px] mx-auto h-20 flex items-center justify-end px-6 w-full">
                {/* 내용 */}
            </div>
        </div>
        {/* 우측 여백 */}
        <div className="hidden md:block transition-all duration-300" style={{ ... }} />
    </div>
</header>
```

#### 15:30 - ConditionalFooter 동작 확인

**Action:** 확인
**File:** `src/components/ConditionalFooter.tsx`

**Changes Made:**

- 기존 구조 유지 (수정 불필요)
- Footer 컴포넌트 자체에 이미 반응형 로직이 적용되어 있어 추가 작업 불필요
- 조건부 렌더링 기능 정상 동작 확인

---

### ✨ 완료된 기능

**Description:** 전체 사이트 헤더 컴포넌트들의 반응형 여백 통합

**Implementation:**

1. Header 반응형 여백 적용 - Footer와 동일한 로직 사용
2. RegisterHeader 반응형 여백 적용 - 일관된 시각적 경험
3. ConditionalFooter 동작 확인 - 기존 Footer 반응형 로직 활용

**Files Modified:**

- `src/components/Header.tsx` - 반응형 3-section 레이아웃 적용
- `src/app/register/components/RegisterHeader.tsx` - 동일한 반응형 로직 적용

**반응형 로직 상세:**

- **1920px 이상**: `calc(320px + ((100vw - 1920px) / 3))` - 점진적 여백 증가
- **1920px ~ 1280px**: 점진적 여백 축소
- **1280px 미만**: 여백 0px로 고정
- **모바일**: `hidden md:block`로 여백 숨김

**Benefits:**

- 전체 사이트 헤더/푸터 시각적 일관성 확보
- 다양한 화면 크기에서 최적화된 레이아웃
- 부드러운 transition 효과로 사용자 경험 향상
- 코드 일관성으로 유지보수성 개선
