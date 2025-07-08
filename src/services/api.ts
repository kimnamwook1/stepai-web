import axios from 'axios';

// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://web-production-e8790.up.railway.app';

// axios 인스턴스 생성
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 (토큰 추가 등)
apiClient.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 (에러 처리 등)
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 401 에러 시 토큰 제거
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
        }
        return Promise.reject(error);
    }
);

// API 응답 타입 정의
export interface ApiResponse<T = any> {
    success: boolean;
    data: T;
    message?: string;
}

// 에러 타입 정의
export interface ApiError {
    message: string;
    status: number;
}
