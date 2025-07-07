import React from "react";

export type SelectedItemProps = {
    open: boolean;
    onClose: () => void;
    data: {
        serviceName: string;
        category: string;
        tags: string[];
        description: string;
        features: string[];
        scenarios: string[];
        rating: number;
        review: string;
        reviewCount: string;
        homepage: string;
        pricing: string;
        sns: { type: string; name: string; handle: string; url: string; icon: React.ReactNode }[];
    };
};

const snsBg: Record<string, string> = {
    twitter: "#f0f9ff",
    linkedin: "#eff6ff",
    youtube: "#fef2f2",
    github: "#f9fafb",
};
const snsColor: Record<string, string> = {
    twitter: "#0284c7",
    linkedin: "#1d4ed8",
    youtube: "#dc2626",
    github: "#374151",
};

export default function SelectedItem({ open, onClose, data }: SelectedItemProps) {
    if (!open) return null;
    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center" }} onClick={onClose}>
            <div style={{ width: '50vw', height: '80vh', background: "#fff", borderRadius: 20, overflow: "hidden", display: "flex", boxShadow: "0 20px 40px rgba(0,0,0,0.3)", position: "relative" }} onClick={e => e.stopPropagation()}>
                <button style={{ position: "absolute", top: 20, right: 20, width: 40, height: 40, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", fontSize: 20, cursor: "pointer", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }} onClick={onClose}>×</button>
                {/* Left */}
                <div style={{ flex: 1, padding: "60px 40px", background: "linear-gradient(135deg,#f8f9ff 0%,#f0f4ff 100%)", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
                        <div style={{ width: 50, height: 50, background: "linear-gradient(135deg,#10b981 0%,#059669 100%)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                            <span style={{ fontSize: 24 }}>🤖</span>
                        </div>
                        <h1 style={{ fontSize: 36, fontWeight: "bold", color: "#1a1a1a" }}>{data.serviceName}</h1>
                    </div>
                    <div style={{ background: "#e0e7ff", color: "#4338ca", padding: "8px 16px", borderRadius: 20, fontSize: 14, marginBottom: 15, fontWeight: 500, display: "inline-block" }}>
                        카테고리: {data.category}
                    </div>
                    <div style={{ marginBottom: 25 }}>
                        {data.tags.map((tag, i) => (
                            <span key={i} style={{ display: "inline-block", background: "#f1f5f9", color: "#475569", padding: "6px 12px", borderRadius: 15, fontSize: 13, marginRight: 8, marginBottom: 8 }}>{tag}</span>
                        ))}
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.6, color: "#4a5568", marginBottom: 30 }}>{data.description}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
                        <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 15 }}>🚀 주요 기능 요약</div>
                            {data.features.map((f, i) => <div key={i} style={{ fontSize: 14, color: "#6b7280", marginBottom: 8, lineHeight: 1.4 }}>• {f}</div>)}
                        </div>
                        <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 15 }}>👥 사용 시나리오</div>
                            {data.scenarios.map((s, i) => <div key={i} style={{ fontSize: 14, color: "#6b7280", marginBottom: 8, lineHeight: 1.4 }}>• {s}</div>)}
                        </div>
                        <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 15 }}>⭐ 사용자 리뷰 / 평점</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                <span style={{ color: "#fbbf24", fontSize: 20 }}>{"★".repeat(Math.round(data.rating))}</span>
                                <span style={{ fontSize: 24, fontWeight: "bold", color: "#1a1a1a" }}>{data.rating.toFixed(1)}</span>
                            </div>
                            <div style={{ fontSize: 14, color: "#4a5568", marginBottom: 5 }}>{data.review}</div>
                            <div style={{ fontSize: 12, color: "#9ca3af" }}>{data.reviewCount}</div>
                        </div>
                    </div>
                </div>
                {/* Right */}
                <div style={{ flex: 1, padding: "50px 35px", background: "#fff", overflowY: "auto" }}>
                    <div style={{ marginBottom: 35 }}>
                        <h2 style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a1a", marginBottom: 20 }}>🌐 공식 홈페이지</h2>
                        <a href={data.homepage} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)", color: "#fff", textDecoration: "none", padding: "16px 20px", borderRadius: 12, marginBottom: 12, fontWeight: 600, transition: "all 0.2s" }}>🔗 바로가기</a>
                        <a href={data.pricing} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)", color: "#fff", textDecoration: "none", padding: "16px 20px", borderRadius: 12, marginBottom: 12, fontWeight: 600, transition: "all 0.2s" }}>💳 요금제 보기</a>
                    </div>
                    <div style={{ marginBottom: 35 }}>
                        <h2 style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a1a", marginBottom: 20 }}>📱 공식 SNS</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {data.sns.map((sns, i) => (
                                <a key={i} href={sns.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, textDecoration: "none", background: snsBg[sns.type] || "#f9fafb", color: snsColor[sns.type] || "#374151", border: "2px solid transparent", fontWeight: 600 }}>
                                    <span style={{ fontSize: 20 }}>{sns.icon}</span>
                                    <div>
                                        <div style={{ fontSize: 14 }}>{sns.name}</div>
                                        <div style={{ fontSize: 12, opacity: 0.7 }}>{sns.handle}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* 뉴스레터 등은 생략, 필요시 추가 */}
                </div>
            </div>
        </div>
    );
}
