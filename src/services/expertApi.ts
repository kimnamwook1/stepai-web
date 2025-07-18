import { apiClient, ApiResponse } from './api';

// 전문가등록 데이터 타입 정의
export interface ExpertProfile {
    nickname: string;
    email: string;
    phone: string;
    category: string;
    skills: string[];
    description: string;
    snsLinks: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
    };
}

export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
    linkUrl?: string;
    type: 'image' | 'video' | 'link';
}

export interface ExpertRegistration {
    profile: ExpertProfile;
    portfolio: PortfolioItem[];
    privacyAgreement: boolean;
}

// 전문가등록 API 서비스
export const expertApi = {
    // 전문가 회원가입
    registerExpert: async (data: ExpertRegistration): Promise<ApiResponse<{ userId: string }>> => {
        try {
            const formData = new FormData();

            // 프로필 정보
            formData.append('profile', JSON.stringify(data.profile));

            // 포트폴리오 정보
            formData.append('portfolio', JSON.stringify(data.portfolio));

            // 개인정보 동의
            formData.append('privacyAgreement', data.privacyAgreement.toString());

            const response = await apiClient.post('/api/expert/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('전문가 등록에 실패했습니다.');
        }
    },

    // 전문가 정보 수정
    updateExpertProfile: async (expertId: string, data: Partial<ExpertProfile>): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.put(`/api/expert/${expertId}`, data);
            return response.data;
        } catch (error) {
            throw new Error('전문가 정보 수정에 실패했습니다.');
        }
    },

    // 전문가 정보 조회
    getExpertProfile: async (expertId: string): Promise<ApiResponse<ExpertProfile>> => {
        try {
            const response = await apiClient.get(`/api/expert/${expertId}`);
            return response.data;
        } catch (error) {
            throw new Error('전문가 정보를 가져오는데 실패했습니다.');
        }
    },

    // 포트폴리오 업로드
    uploadPortfolio: async (expertId: string, portfolio: PortfolioItem): Promise<ApiResponse<PortfolioItem>> => {
        try {
            const formData = new FormData();
            formData.append('portfolio', JSON.stringify(portfolio));

            if (portfolio.imageUrl) {
                formData.append('image', portfolio.imageUrl);
            }
            if (portfolio.videoUrl) {
                formData.append('video', portfolio.videoUrl);
            }

            const response = await apiClient.post(`/api/expert/${expertId}/portfolio`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('포트폴리오 업로드에 실패했습니다.');
        }
    },

    // 닉네임 중복 확인
    checkNickname: async (nickname: string): Promise<ApiResponse<{ isDuplicate: boolean }>> => {
        try {
            const response = await apiClient.get(`/api/expert/check-nickname/${nickname}`);
            return response.data;
        } catch (error) {
            throw new Error('닉네임 확인에 실패했습니다.');
        }
    },
};
