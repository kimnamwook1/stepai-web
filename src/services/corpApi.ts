import { apiClient, ApiResponse } from './api';

// 기업등록 데이터 타입 정의
export interface CompanyInfo {
    companyName: string;
    representativeName: string;
    companyType: string;
    businessNumber: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
}

export interface AIService {
    serviceName: string;
    category: string;
    description: string;
    website: string;
    tags: string[];
}

export interface CompanyRegistration {
    companyInfo: CompanyInfo;
    aiService: AIService;
    businessLicense: File;
    aiManager: {
        name: string;
        phone: string;
        email: string;
    };
    privacyAgreement: boolean;
}

// 기업등록 API 서비스
export const corpApi = {
    // 기업 회원가입
    registerCompany: async (data: CompanyRegistration): Promise<ApiResponse<{ userId: string }>> => {
        try {
            const formData = new FormData();

            // 회사 정보
            formData.append('companyInfo', JSON.stringify(data.companyInfo));

            // AI 서비스 정보
            formData.append('aiService', JSON.stringify(data.aiService));

            // 사업자등록증
            formData.append('businessLicense', data.businessLicense);

            // AI 담당자 정보
            formData.append('aiManager', JSON.stringify(data.aiManager));

            // 개인정보 동의
            formData.append('privacyAgreement', data.privacyAgreement.toString());

            const response = await apiClient.post('/api/company/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('기업 등록에 실패했습니다.');
        }
    },

    // 기업 정보 수정
    updateCompanyInfo: async (companyId: string, data: Partial<CompanyInfo>): Promise<ApiResponse<void>> => {
        try {
            const response = await apiClient.put(`/api/company/${companyId}`, data);
            return response.data;
        } catch (error) {
            throw new Error('기업 정보 수정에 실패했습니다.');
        }
    },

    // 기업 정보 조회
    getCompanyInfo: async (companyId: string): Promise<ApiResponse<CompanyInfo>> => {
        try {
            const response = await apiClient.get(`/api/company/${companyId}`);
            return response.data;
        } catch (error) {
            throw new Error('기업 정보를 가져오는데 실패했습니다.');
        }
    },

    // 사업자등록번호 중복 확인
    checkBusinessNumber: async (businessNumber: string): Promise<ApiResponse<{ isDuplicate: boolean }>> => {
        try {
            const response = await apiClient.get(`/api/company/check-business-number/${businessNumber}`);
            return response.data;
        } catch (error) {
            throw new Error('사업자등록번호 확인에 실패했습니다.');
        }
    },
};
