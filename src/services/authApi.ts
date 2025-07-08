import { apiClient, ApiResponse } from './api';

// 인증 데이터 타입 정의
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    userType: 'company' | 'expert';
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
        userType: 'company' | 'expert';
    };
}

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    userType: 'company' | 'expert';
    createdAt: string;
    updatedAt: string;
}

// 인증 API 서비스
export const authApi = {
    // 로그인
    login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
        try {
            const response = await apiClient.post('/api/auth/login', data);
            return response.data;
        } catch (error) {
            throw new Error('로그인에 실패했습니다.');
        }
    },

    // 회원가입
    register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
        try {
            const response = await apiClient.post('/api/auth/register', data);
            return response.data;
        } catch (error) {
            throw new Error('회원가입에 실패했습니다.');
        }
    },

    // 로그아웃
    logout: async (): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.post('/api/auth/logout');
            return response.data;
        } catch (error) {
            throw new Error('로그아웃에 실패했습니다.');
        }
    },

    // 사용자 프로필 가져오기
    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        try {
            const response = await apiClient.get('/api/auth/profile');
            return response.data;
        } catch (error) {
            throw new Error('사용자 프로필을 가져오는데 실패했습니다.');
        }
    },

    // 프로필 수정
    updateProfile: async (data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
        try {
            const response = await apiClient.put('/api/auth/profile', data);
            return response.data;
        } catch (error) {
            throw new Error('프로필 수정에 실패했습니다.');
        }
    },

    // 비밀번호 변경
    changePassword: async (data: {
        currentPassword: string;
        newPassword: string;
    }): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.put('/api/auth/password', data);
            return response.data;
        } catch (error) {
            throw new Error('비밀번호 변경에 실패했습니다.');
        }
    },

    // 이메일 중복 확인
    checkEmail: async (email: string): Promise<ApiResponse<{ isDuplicate: boolean }>> => {
        try {
            const response = await apiClient.get(`/api/auth/check-email/${email}`);
            return response.data;
        } catch (error) {
            throw new Error('이메일 확인에 실패했습니다.');
        }
    },

    // 토큰 갱신
    refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
        try {
            const response = await apiClient.post('/api/auth/refresh');
            return response.data;
        } catch (error) {
            throw new Error('토큰 갱신에 실패했습니다.');
        }
    },

    // 비밀번호 재설정 요청
    requestPasswordReset: async (email: string): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.post('/api/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw new Error('비밀번호 재설정 요청에 실패했습니다.');
        }
    },

    // 비밀번호 재설정
    resetPassword: async (data: {
        token: string;
        newPassword: string;
    }): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.post('/api/auth/reset-password', data);
            return response.data;
        } catch (error) {
            throw new Error('비밀번호 재설정에 실패했습니다.');
        }
    },
};
