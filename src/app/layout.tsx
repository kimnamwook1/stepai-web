import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "STEPAI | 스텝AI",
    description: "사용자 맞춤형 콘텐츠를 제공하는 지능형 큐레이션 웹 서비스",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                <link
                    rel="stylesheet"
                    as="style"
                    crossOrigin=""
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
                />
            </head>
            <body className="font-pretendard antialiased">
                {children}
            </body>
        </html>
    );
}
