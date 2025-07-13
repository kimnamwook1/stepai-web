import { apiClient } from './api';
import {
    AIService,
    AICategory,
    ApiResponse,
    PaginatedResponse
} from '@/types/api';

// 카테고리 API 서비스
export const categoryApi = {
    // 모든 카테고리 가져오기
    getAllCategories: async (): Promise<ApiResponse<AICategory[]>> => {
        try {
            const response = await apiClient.get('/api/ai-categories?limit=1000');
            return response.data;
        } catch (error) {
            throw new Error('카테고리 목록을 가져오는데 실패했습니다.');
        }
    },

    // 카테고리별 서비스 목록 가져오기
    getServicesByCategory: async (
        categoryId: number,
        params?: {
            page?: number;
            limit?: number;
            ai_status?: string;
            ai_type?: string;
        }
    ): Promise<ApiResponse<PaginatedResponse<AIService>>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.ai_status) queryParams.append('ai_status', params.ai_status);
            if (params?.ai_type) queryParams.append('ai_type', params.ai_type);
            queryParams.append('category_id', categoryId.toString());
            queryParams.append('include_contents', 'true');
            queryParams.append('include_tags', 'true');
            queryParams.append('include_categories', 'true');
            queryParams.append('include_companies', 'true');

            const response = await apiClient.get(`/api/ai-services?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('카테고리별 서비스를 가져오는데 실패했습니다.');
        }
    },

    // 카테고리 상세 정보 가져오기
    getCategoryDetail: async (categoryId: number): Promise<ApiResponse<AICategory>> => {
        try {
            const response = await apiClient.get(`/api/ai-categories/${categoryId}`);
            return response.data;
        } catch (error) {
            throw new Error('카테고리 상세 정보를 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 검색
    searchAIServices: async (
        searchTerm: string,
        params?: {
            page?: number;
            limit?: number;
        }
    ): Promise<ApiResponse<AIService[]>> => {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('q', searchTerm);
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());

            const response = await apiClient.get(`/api/ai-services/search?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 검색에 실패했습니다.');
        }
    },

    // AI 서비스 상세 정보 가져오기
    getAIServiceDetail: async (serviceId: number): Promise<ApiResponse<AIService>> => {
        try {
            const response = await apiClient.get(`/api/ai-services/${serviceId}/detail`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 상세 정보를 가져오는데 실패했습니다.');
        }
    },

    // 인기 카테고리 가져오기 (서비스 수가 많은 카테고리)
    getPopularCategories: async (limit = 10): Promise<ApiResponse<AICategory[]>> => {
        try {
            const response = await apiClient.get(`/api/ai-categories?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw new Error('인기 카테고리를 가져오는데 실패했습니다.');
        }
    },

    // 최신 AI 서비스 가져오기
    getLatestAIServices: async (limit = 10): Promise<ApiResponse<AIService[]>> => {
        try {
            const response = await apiClient.get(`/api/ai-services?page=1&limit=${limit}&include_contents=true&include_tags=true&include_categories=true&include_companies=true`);
            return response.data;
        } catch (error) {
            throw new Error('최신 AI 서비스를 가져오는데 실패했습니다.');
        }
    },
};
