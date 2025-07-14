// 사용자 관련 타입
export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    user_status?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserCreateRequest {
    username: string;
    email: string;
    password_hash: string;
    user_status?: string;
}

export interface UserUpdateRequest {
    username?: string;
    email?: string;
    password_hash?: string;
    user_status?: string;
}

// AI 서비스 관련 타입
export interface AIService {
    id: number;
    ai_name: string;
    ai_description?: string;
    ai_type: string;
    ai_status?: string;
    nationality?: string;
    created_at?: string;
    updated_at?: string;
}

export interface AIServiceDetail extends AIService {
    contents: AIServiceContent[];
    tags: AIServiceTag[];
    categories: AICategory[];
    companies: any[]; // 회사 정보 타입은 추후 정의
}

export interface AIServiceCreateRequest {
    ai_name: string;
    ai_description?: string;
    ai_type: string;
    ai_status?: string;
    nationality?: string;
    category_ids?: number[]; // 카테고리 ID 배열 추가
}

export interface AIServiceUpdateRequest {
    ai_name?: string;
    ai_description?: string;
    ai_type?: string;
    ai_status?: string;
    nationality?: string;
}

// AI 서비스 콘텐츠 관련 타입
export interface AIServiceContent {
    id: number;
    ai_service_id: number;
    content_title: string;
    content_url?: string;
    content_type: string;
    content_description?: string;
    content_order_index?: number;
    created_at?: string;
    updated_at?: string;
}

export interface AIServiceContentCreateRequest {
    ai_service_id: number;
    content_title: string;
    content_url?: string;
    content_type: string;
    content_description?: string;
    content_order_index?: number;
}

export interface AIServiceContentUpdateRequest {
    content_title?: string;
    content_url?: string;
    content_type?: string;
    content_description?: string;
    content_order_index?: number;
}

// AI 서비스 태그 관련 타입
export interface AIServiceTag {
    id: number;
    ai_service_id: number;
    tag_name: string;
    created_at?: string;
    updated_at?: string;
}

export interface AIServiceTagCreateRequest {
    ai_service_id: number;
    tag_name: string;
}

export interface AIServiceTagUpdateRequest {
    tag_name?: string;
}

// AI 카테고리 관련 타입
export interface AICategory {
    id: number;
    category_name: string;
    category_icon?: string;
    created_at?: string;
    updated_at?: string;
}

export interface AICategoryCreateRequest {
    category_name: string;
    category_icon?: string;
}

export interface AICategoryUpdateRequest {
    category_name?: string;
    category_icon?: string;
}

// 공통 응답 타입
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

// 통계 타입
export interface AIServiceStats {
    total_services: number;
    active_services: number;
    inactive_services: number;
    total_categories: number;
    total_tags: number;
}
