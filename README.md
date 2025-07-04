This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 윈도우 환경 세팅법

- Node.js 버전: 18.x 권장 (nvm-windows 등으로 버전 고정)
- 패키지 설치: `npm ci` 사용 (lockfile 기반)
- 필수 VSCode 확장:
    - Tailwind CSS IntelliSense
    - Prettier
    - ESLint
    - EditorConfig for VS Code
- VSCode 설정: .vscode/settings.json 자동 적용
- 코드 스타일: .editorconfig 자동 적용
- 폰트/렌더링: Tailwind 및 글로벌 CSS에서 폰트 패밀리, 스무딩 등 지정
- 환경설정 문제 발생 시: VSCode 재시작, 확장 재설치, Node 버전 확인

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 필수 VSCode 확장
- Tailwind CSS IntelliSense
- Prettier
- ESLint
- EditorConfig for VS Code

## Node.js 버전 통일 (nvm-windows)
- nvm-windows 설치 후 원하는 Node 버전 설치/사용
- 예시:
  ```
  nvm install 24.3.0
  nvm use 24.3.0
  ```
- package.json의 engines 참고

## 패키지 설치 (lockfile 기반)
- 반드시 `npm ci` 명령 사용 (package-lock.json 기준)
- 예시:
  ```
  npm ci
  ```

## Tailwind/글로벌 CSS 폰트 패밀리/스무딩
- tailwind.config.ts의 fontFamily.pretendard 참고
- 글로벌 CSS에 아래 예시 추가:
  ```css
  html {
    font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ```

## 브라우저/OS별 폰트/렌더링 차이 최소화
- 위 글로벌 CSS 적용
- Pretendard 등 웹폰트 사용 권장
- Tailwind 폰트 설정 통일

## 환경설정 관련 문서화
- 이 README의 "윈도우 환경 세팅법" 및 위 항목 참고
- 신규 개발자 온보딩 시 이 문서 필수 참고
