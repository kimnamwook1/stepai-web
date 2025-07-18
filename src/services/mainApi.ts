import { apiClient } from './api';
import {
    AIService,
    AICategory,
    ApiResponse,
    PaginatedResponse
} from '@/types/api';

// 메인페이지 API 서비스
export const mainApi = {
    // 트렌드 데이터 가져오기 (최신 AI 서비스)
    getTrends: async (): Promise<ApiResponse<AIService[]>> => {
        try {
            const response = await apiClient.get('/api/ai-services?page=1&limit=10&include_contents=true&include_tags=true&include_categories=true&include_companies=true');
            return response.data;
        } catch (error) {
            throw new Error('트렌드 데이터를 가져오는데 실패했습니다.');
        }
    },

    // 카테고리 데이터 가져오기
    getCategories: async (): Promise<ApiResponse<AICategory[]>> => {
        try {
            const response = await apiClient.get('/api/ai-categories?limit=1000');
            return response.data;
        } catch (error) {
            throw new Error('카테고리 데이터를 가져오는데 실패했습니다.');
        }
    },

    // 최근 추가된 서비스 가져오기
    getRecentlyAdded: async (): Promise<ApiResponse<AIService[]>> => {
        try {
            const response = await apiClient.get('/api/ai-services?ai_status=active&limit=6');
            return response.data;
        } catch (error) {
            throw new Error('최근 추가된 서비스를 가져오는데 실패했습니다.');
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
};
