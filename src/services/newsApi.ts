import { apiClient, ApiResponse } from './api';

// 뉴스 데이터 타입 정의
export interface NewsItem {
    id: string;
    title: string;
    content: string;
    summary: string;
    image: string;
    date: string;
    category: string;
    author: string;
    tags: string[];
    viewCount: number;
}

export interface NewsFilter {
    category?: string;
    date?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface NewsListResponse {
    news: NewsItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// 뉴스 API 서비스
export const newsApi = {
    // 뉴스 목록 가져오기
    getNewsList: async (filter?: NewsFilter): Promise<ApiResponse<NewsListResponse>> => {
        try {
            const params = new URLSearchParams();
            if (filter?.category) params.append('category', filter.category);
            if (filter?.date) params.append('date', filter.date);
            if (filter?.search) params.append('search', filter.search);
            if (filter?.page) params.append('page', filter.page.toString());
            if (filter?.limit) params.append('limit', filter.limit.toString());

            const response = await apiClient.get(`/api/news?${params.toString()}`);
            return response.data;
        } catch (error) {
            throw new Error('뉴스 목록을 가져오는데 실패했습니다.');
        }
    },

    // 뉴스 상세 정보 가져오기
    getNewsDetail: async (newsId: string): Promise<ApiResponse<NewsItem>> => {
        try {
            const response = await apiClient.get(`/api/news/${newsId}`);
            return response.data;
        } catch (error) {
            throw new Error('뉴스 상세 정보를 가져오는데 실패했습니다.');
        }
    },

    // 카테고리별 뉴스 가져오기
    getNewsByCategory: async (category: string, page = 1, limit = 10): Promise<ApiResponse<NewsListResponse>> => {
        try {
            const response = await apiClient.get(`/api/news/category/${category}?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw new Error('카테고리별 뉴스를 가져오는데 실패했습니다.');
        }
    },

    // 검색 뉴스 가져오기
    searchNews: async (searchTerm: string, page = 1, limit = 10): Promise<ApiResponse<NewsListResponse>> => {
        try {
            const response = await apiClient.get(`/api/news/search?q=${searchTerm}&page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            throw new Error('뉴스 검색에 실패했습니다.');
        }
    },

    // 최신 뉴스 가져오기
    getLatestNews: async (limit = 5): Promise<ApiResponse<NewsItem[]>> => {
        try {
            const response = await apiClient.get(`/api/news/latest?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw new Error('최신 뉴스를 가져오는데 실패했습니다.');
        }
    },

    // 인기 뉴스 가져오기
    getPopularNews: async (limit = 5): Promise<ApiResponse<NewsItem[]>> => {
        try {
            const response = await apiClient.get(`/api/news/popular?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw new Error('인기 뉴스를 가져오는데 실패했습니다.');
        }
    },

    // 뉴스 카테고리 목록 가져오기
    getNewsCategories: async (): Promise<ApiResponse<string[]>> => {
        try {
            const response = await apiClient.get('/api/news/categories');
            return response.data;
        } catch (error) {
            throw new Error('뉴스 카테고리를 가져오는데 실패했습니다.');
        }
    },

    // 조회수 증가
    incrementViewCount: async (newsId: string): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.post(`/api/news/${newsId}/view`);
            return response.data;
        } catch (error) {
            throw new Error('조회수 증가에 실패했습니다.');
        }
    },
};
