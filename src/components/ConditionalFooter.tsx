"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

/**
 * 경로에 따라 조건부로 Footer를 렌더링하는 컴포넌트
 * register 폴더의 페이지들에서는 Footer를 숨김
 */
export default function ConditionalFooter() {
    const pathname = usePathname();

    // register 경로에서는 Footer를 렌더링하지 않음
    const shouldShowFooter = !pathname.startsWith("/register");

    return shouldShowFooter ? <Footer /> : null;
}
