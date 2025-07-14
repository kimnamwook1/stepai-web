import { apiClient } from './api';
import {
    AIServiceContent,
    AIServiceContentCreateRequest,
    AIServiceContentUpdateRequest,
    ApiResponse,
    PaginatedResponse
} from '@/types/api';

// AI 서비스 콘텐츠 관리 API 서비스
export const aiServiceContentApi = {
    // AI 서비스 콘텐츠 생성
    createAIServiceContent: async (data: AIServiceContentCreateRequest): Promise<ApiResponse<AIServiceContent>> => {
        try {
            const response = await apiClient.post('/api/ai-service-contents', data);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 콘텐츠 생성에 실패했습니다.');
        }
    },

    // createContent 별칭 (등록 페이지 호환성)
    createContent: async (data: AIServiceContentCreateRequest): Promise<ApiResponse<AIServiceContent>> => {
        return aiServiceContentApi.createAIServiceContent(data);
    },

    // AI 서비스 콘텐츠 조회 (ID)
    getAIServiceContentById: async (id: number): Promise<ApiResponse<AIServiceContent>> => {
        try {
            const response = await apiClient.get(`/api/ai-service-contents/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 콘텐츠 정보를 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 콘텐츠 목록 조회
    getAIServiceContents: async (params?: {
        page?: number;
        limit?: number;
        ai_service_id?: number;
        content_type?: string;
    }): Promise<ApiResponse<PaginatedResponse<AIServiceContent>>> => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.page) queryParams.append('page', params.page.toString());
            if (params?.limit) queryParams.append('limit', params.limit.toString());
            if (params?.ai_service_id) queryParams.append('ai_service_id', params.ai_service_id.toString());
            if (params?.content_type) queryParams.append('content_type', params.content_type);

            const response = await apiClient.get(`/api/ai-service-contents?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 콘텐츠 목록을 가져오는데 실패했습니다.');
        }
    },

    // AI 서비스 콘텐츠 수정
    updateAIServiceContent: async (id: number, data: AIServiceContentUpdateRequest): Promise<ApiResponse<AIServiceContent>> => {
        try {
            const response = await apiClient.put(`/api/ai-service-contents/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 콘텐츠 수정에 실패했습니다.');
        }
    },

    // AI 서비스 콘텐츠 삭제
    deleteAIServiceContent: async (id: number): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.delete(`/api/ai-service-contents/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 콘텐츠 삭제에 실패했습니다.');
        }
    },

    // 특정 AI 서비스의 모든 콘텐츠 조회
    getContentsByAIServiceId: async (aiServiceId: number): Promise<ApiResponse<AIServiceContent[]>> => {
        try {
            const response = await apiClient.get(`/api/ai-service-contents?ai_service_id=${aiServiceId}`);
            return response.data;
        } catch (error) {
            throw new Error('AI 서비스 콘텐츠를 가져오는데 실패했습니다.');
        }
    },
};
