import { apiClient } from './api';
import {
    User,
    UserCreateRequest,
    UserUpdateRequest,
    ApiResponse,
    PaginatedResponse
} from '@/types/api';

// 사용자 관리 API 서비스
export const userApi = {
    // 사용자 생성
    createUser: async (data: UserCreateRequest): Promise<ApiResponse<User>> => {
        try {
            const response = await apiClient.post('/api/users', data);
            return response.data;
        } catch (error) {
            throw new Error('사용자 생성에 실패했습니다.');
        }
    },

    // 사용자 조회 (ID)
    getUserById: async (id: number): Promise<ApiResponse<User>> => {
        try {
            const response = await apiClient.get(`/api/users/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('사용자 정보를 가져오는데 실패했습니다.');
        }
    },

    // 사용자 조회 (이메일)
    getUserByEmail: async (email: string): Promise<ApiResponse<User>> => {
        try {
            const response = await apiClient.get(`/api/users/email/${email}`);
            return response.data;
        } catch (error) {
            throw new Error('사용자 정보를 가져오는데 실패했습니다.');
        }
    },

    // 사용자 목록 조회
    getUsers: async (params?: {
        page?: number;
        limit?: number;
        status?: string;
        email?: string;
    }): Promise<ApiResponse<PaginatedResponse<User>>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.status) queryParams.append('status', params.status);
            if (params?.email) queryParams.append('email', params.email);

            const response = await apiClient.get(`/api/users?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('사용자 목록을 가져오는데 실패했습니다.');
        }
    },

    // 사용자 정보 수정
    updateUser: async (id: number, data: UserUpdateRequest): Promise<ApiResponse<User>> => {
        try {
            const response = await apiClient.put(`/api/users/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('사용자 정보 수정에 실패했습니다.');
        }
    },

    // 사용자 삭제
    deleteUser: async (id: number): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.delete(`/api/users/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('사용자 삭제에 실패했습니다.');
        }
    },
};
