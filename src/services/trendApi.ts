import { apiClient, ApiResponse } from './api';

// 트렌드 데이터 타입 정의
export interface TrendRankingItem {
    id: string;
    serviceName: string;
    category: string;
    logo: string;
    website: string;
    snsLinks: {
        twitter?: string;
        linkedin?: string;
        facebook?: string;
    };
    trend: {
        direction: 'up' | 'down';
        change: number;
    };
    rank: number;
}

export interface TrendCategory {
    id: string;
    name: string;
    count: number;
}

export interface TrendFilter {
    date?: string;
    category?: string;
    country?: string;
    review?: string;
}

// 트렌드 API 서비스
export const trendApi = {
    // 트렌드 랭킹 가져오기
    getTrendRanking: async (filter?: TrendFilter): Promise<ApiResponse<TrendRankingItem[]>> => {
        try {
            const params = new URLSearchParams();
            if (filter?.date) params.append('date', filter.date);
            if (filter?.category) params.append('category', filter.category);
            if (filter?.country) params.append('country', filter.country);
            if (filter?.review) params.append('review', filter.review);

            const response = await apiClient.get(`/api/trends/ranking?${params.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('트렌드 랭킹을 가져오는데 실패했습니다.');
        }
    },

    // 카테고리별 트렌드 가져오기
    getTrendsByCategory: async (category: string): Promise<ApiResponse<TrendRankingItem[]>> => {
        try {
            const response = await apiClient.get(`/api/trends/category/${category}`);
            return response.data;
        } catch (error) {
            throw new Error('카테고리별 트렌드를 가져오는데 실패했습니다.');
        }
    },

    // 날짜별 트렌드 가져오기
    getTrendsByDate: async (date: string): Promise<ApiResponse<TrendRankingItem[]>> => {
        try {
            const response = await apiClient.get(`/api/trends/date/${date}`);
            return response.data;
        } catch (error) {
            throw new Error('날짜별 트렌드를 가져오는데 실패했습니다.');
        }
    },

    // 국가별 트렌드 가져오기
    getTrendsByCountry: async (country: string): Promise<ApiResponse<TrendRankingItem[]>> => {
        try {
            const response = await apiClient.get(`/api/trends/country/${country}`);
            return response.data;
        } catch (error) {
            throw new Error('국가별 트렌드를 가져오는데 실패했습니다.');
        }
    },

    // 리뷰별 트렌드 가져오기
    getTrendsByReview: async (review: string): Promise<ApiResponse<TrendRankingItem[]>> => {
        try {
            const response = await apiClient.get(`/api/trends/review/${review}`);
            return response.data;
        } catch (error) {
            throw new Error('리뷰별 트렌드를 가져오는데 실패했습니다.');
        }
    },

    // 인기 카테고리 가져오기
    getPopularCategories: async (): Promise<ApiResponse<TrendCategory[]>> => {
        try {
            const response = await apiClient.get('/api/trends/popular-categories');
            return response.data;
        } catch (error) {
            throw new Error('인기 카테고리를 가져오는데 실패했습니다.');
        }
    },

    // 서비스 상세 정보 가져오기
    getServiceDetail: async (serviceId: string): Promise<ApiResponse<any>> => {
        try {
            const response = await apiClient.get(`/api/trends/service/${serviceId}`);
            return response.data;
        } catch (error) {
            throw new Error('서비스 상세 정보를 가져오는데 실패했습니다.');
        }
    },
};
