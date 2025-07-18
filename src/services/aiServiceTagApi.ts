import { apiClient } from './api';
import {
    AIServiceTag,
    AIServiceTagCreateRequest,
    AIServiceTagUpdateRequest,
    ApiResponse,
    PaginatedResponse
} from '@/types/api';

// AI 서비스 태그 관리 API 서비스
export const aiServiceTagApi = {
    // AI 서비스 태그 생성
    createAIServiceTag: async (data: AIServiceTagCreateRequest): Promise<ApiResponse<AIServiceTag>> => {
        try {
            const response = await apiClient.post('/api/ai-service-tags', data);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 태그 생성에 실패했습니다.');
        }
    },

    // AI 서비스 태그 조회 (ID)
    getAIServiceTagById: async (id: number): Promise<ApiResponse<AIServiceTag>> => {
        try {
            const response = await apiClient.get(`/api/ai-service-tags/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 태그 정보를 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 태그 목록 조회
    getAIServiceTags: async (params?: {
        page?: number;
        limit?: number;
        ai_service_id?: number;
        tag_name?: string;
    }): Promise<ApiResponse<PaginatedResponse<AIServiceTag>>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.ai_service_id) queryParams.append('ai_service_id', params.ai_service_id.toString());
            if (params?.tag_name) queryParams.append('tag_name', params.tag_name);

            const response = await apiClient.get(`/api/ai-service-tags?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 태그 목록을 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 태그 수정
    updateAIServiceTag: async (id: number, data: AIServiceTagUpdateRequest): Promise<ApiResponse<AIServiceTag>> => {
        try {
            const response = await apiClient.put(`/api/ai-service-tags/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 태그 수정에 실패했습니다.');
        }
    },

    // AI 서비스 태그 삭제
    deleteAIServiceTag: async (id: number): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.delete(`/api/ai-service-tags/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 태그 삭제에 실패했습니다.');
        }
    },

    // 특정 AI 서비스의 모든 태그 조회
    getTagsByAIServiceId: async (aiServiceId: number): Promise<ApiResponse<AIServiceTag[]>> => {
        try {
            const response = await apiClient.get(`/api/ai-service-tags?ai_service_id=${aiServiceId}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 태그를 가져오는데 실패했습니다.');
        }
    },

    // 태그명으로 검색
    searchTagsByName: async (tagName: string): Promise<ApiResponse<AIServiceTag[]>> => {
        try {
            const response = await apiClient.get(`/api/ai-service-tags?tag_name=${encodeURIComponent(tagName)}`);
            return response.data;
        } catch (error) {
            throw new Error('태그 검색에 실패했습니다.');
        }
    },
};
