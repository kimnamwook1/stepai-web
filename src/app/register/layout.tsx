import RegisterHeader from "./components/RegisterHeader";

/**
 * Register 섹션의 공통 레이아웃
 * 모든 register 하위 페이지에 RegisterHeader와 배경색을 공통 적용
 */
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
