import { apiClient } from './api';
import {
    AICategory,
    AICategoryCreateRequest,
    AICategoryUpdateRequest,
    ApiResponse,
    PaginatedResponse
} from '@/types/api';

// AI 카테고리 관리 API 서비스
export const aiCategoryApi = {
    // AI 카테고리 생성
    createAICategory: async (data: AICategoryCreateRequest): Promise<ApiResponse<AICategory>> => {
        try {
            const response = await apiClient.post('/api/ai-categories', data);
            return response.data;
        } catch (error) {
            throw new Error('AI 카테고리 생성에 실패했습니다.');
        }
    },

    // AI 카테고리 조회 (ID)
    getAICategoryById: async (id: number): Promise<ApiResponse<AICategory>> => {
        try {
            const response = await apiClient.get(`/api/ai-categories/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 카테고리 정보를 가져오는데 실패했습니다.');
        }
    },

    // AI 카테고리 목록 조회
    getAICategories: async (params?: {
        page?: number;
        limit?: number;
        category_name?: string;
        category_icon?: string;
    }): Promise<ApiResponse<PaginatedResponse<AICategory>>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.category_name) queryParams.append('category_name', params.category_name);
            if (params?.category_icon) queryParams.append('category_icon', params.category_icon);

            const response = await apiClient.get(`/api/ai-categories?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 카테고리 목록을 가져오는데 실패했습니다.');
        }
    },

    // AI 카테고리 수정
    updateAICategory: async (id: number, data: AICategoryUpdateRequest): Promise<ApiResponse<AICategory>> => {
        try {
            const response = await apiClient.put(`/api/ai-categories/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('AI 카테고리 수정에 실패했습니다.');
        }
    },

    // AI 카테고리 삭제
    deleteAICategory: async (id: number): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.delete(`/api/ai-categories/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 카테고리 삭제에 실패했습니다.');
        }
    },

    // 카테고리명으로 검색
    searchCategoriesByName: async (categoryName: string): Promise<ApiResponse<AICategory[]>> => {
        try {
            const response = await apiClient.get(`/api/ai-categories?category_name=${encodeURIComponent(categoryName)}`);
            return response.data;
        } catch (error) {
            throw new Error('카테고리 검색에 실패했습니다.');
        }
    },

    // 모든 카테고리 조회 (페이지네이션 없이)
    getAllCategories: async (): Promise<ApiResponse<AICategory[]>> => {
        try {
            const response = await apiClient.get('/api/ai-categories?limit=1000'); // 큰 limit으로 모든 카테고리 가져오기
            return response.data;
        } catch (error) {
            throw new Error('모든 카테고리를 가져오는데 실패했습니다.');
        }
    },
};
