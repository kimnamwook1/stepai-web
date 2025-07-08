import { apiClient } from './api';
import {
    AIService,
    AIServiceDetail,
    AIServiceCreateRequest,
    AIServiceUpdateRequest,
    ApiResponse,
    PaginatedResponse,
    AIServiceStats
} from '@/types/api';

// AI 서비스 관리 API 서비스
export const aiServiceApi = {
    // AI 서비스 생성
    createAIService: async (data: AIServiceCreateRequest): Promise<ApiResponse<AIService>> => {
        try {
            const response = await apiClient.post('/api/ai-services', data);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 생성에 실패했습니다.');
        }
    },

    // AI 서비스 조회 (ID)
    getAIServiceById: async (id: number): Promise<ApiResponse<AIService>> => {
        try {
            const response = await apiClient.get(`/api/ai-services/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 정보를 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 상세 조회 (콘텐츠, 태그, 카테고리 포함)
    getAIServiceDetail: async (id: number): Promise<ApiResponse<AIServiceDetail>> => {
        try {
            const response = await apiClient.get(`/api/ai-services/${id}/detail`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 상세 정보를 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 목록 조회
    getAIServices: async (params?: {
        page?: number;
        limit?: number;
        ai_status?: string;
        ai_type?: string;
        nationality?: string;
        category_id?: number;
    }): Promise<ApiResponse<PaginatedResponse<AIService>>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.ai_status) queryParams.append('ai_status', params.ai_status);
            if (params?.ai_type) queryParams.append('ai_type', params.ai_type);
            if (params?.nationality) queryParams.append('nationality', params.nationality);
            if (params?.category_id) queryParams.append('category_id', params.category_id.toString());

            const response = await apiClient.get(`/api/ai-services?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 목록을 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 검색
    searchAIServices: async (searchTerm: string): Promise<ApiResponse<AIService[]>> => {
        try {
            const response = await apiClient.get(`/api/ai-services/search?q=${encodeURIComponent(searchTerm)}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 검색에 실패했습니다.');
        }
    },

    // AI 서비스 수정
    updateAIService: async (id: number, data: AIServiceUpdateRequest): Promise<ApiResponse<AIService>> => {
        try {
            const response = await apiClient.put(`/api/ai-services/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 수정에 실패했습니다.');
        }
    },

    // AI 서비스 삭제
    deleteAIService: async (id: number): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.delete(`/api/ai-services/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 삭제에 실패했습니다.');
        }
    },

    // AI 서비스 통계
    getAIServiceStats: async (): Promise<ApiResponse<AIServiceStats>> => {
        try {
            const response = await apiClient.get('/api/ai-services/stats/overview');
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 통계를 가져오는데 실패했습니다.');
        }
    },
};
