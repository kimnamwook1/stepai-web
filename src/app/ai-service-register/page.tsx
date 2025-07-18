"use client";

import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { aiCategoryApi, aiServiceApi, aiServiceContentApi, aiServiceTagApi } from '@/services';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Category {
    id: number;
    category_name: string;
    category_icon?: string;
}

interface FileUploadResponse {
    success: boolean;
    data: {
        url: string;
        filename: string;
    };
    message: string;
}

const AIServiceRegisterPage = () => {
    // 카테고리 목록
    const { data: categoriesData } = useApi(aiCategoryApi.getAllCategories);
    const categories: Category[] = (categoriesData as any)?.categories || [];

    // 폼 상태
    const [formData, setFormData] = useState({
        ai_name: '',
        ai_description: '',
        ai_type: 'LLM',
        nationality: '한국',
        category_ids: [] as number[],
        tags: '',
        service_url: '',
    });

    // 파일 업로드 상태
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [iconFile, setIconFile] = useState<File | null>(null);

    // 드래그 앤 드롭 상태
    const [dragActive, setDragActive] = useState({
        thumbnail: false,
        icon: false
    });

    // 파일 업로드 함수
    const uploadFile = async (file: File, type: 'categories' | 'ai-services'): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://web-production-e8790.up.railway.app';
            const response = await fetch(`${API_BASE_URL}/api/assets/upload/${type}`, {
                method: 'POST',
                body: formData,
            });

            const result: FileUploadResponse = await response.json();

            if (result.success) {
                return result.data.url;
            } else {
                throw new Error(result.message || '업로드 실패');
            }
        } catch (error) {
            console.error('파일 업로드 오류:', error);
            throw error;
        }
    };



    // 드래그 앤 드롭 핸들러
    const handleDrag = (e: React.DragEvent, type: 'thumbnail' | 'icon') => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(prev => ({ ...prev, [type]: true }));
        } else if (e.type === "dragleave") {
            setDragActive(prev => ({ ...prev, [type]: false }));
        }
    };

    const handleDrop = (e: React.DragEvent, type: 'thumbnail' | 'icon') => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(prev => ({ ...prev, [type]: false }));

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (type === 'thumbnail') {
                setThumbnailFile(file);
            } else {
                setIconFile(file);
            }
        }
    };

    // 파일 선택 핸들러
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'icon') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'thumbnail') {
                setThumbnailFile(file);
            } else {
                setIconFile(file);
            }
        }
    };

    // 폼 제출
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // 1. 파일 업로드 (대표이미지)
            let thumbnailUrl = '';
            if (thumbnailFile) {
                thumbnailUrl = await uploadFile(thumbnailFile, 'ai-services');
            }

            // 2. 파일 업로드 (아이콘)
            let iconUrl = '';
            if (iconFile) {
                iconUrl = await uploadFile(iconFile, 'ai-services');
            }

            // 3. AI 서비스 생성
            const serviceResponse = await aiServiceApi.createAIService({
                ai_name: formData.ai_name,
                ai_description: formData.ai_description,
                ai_type: formData.ai_type,
                nationality: formData.nationality,
                category_ids: formData.category_ids,
            });

            if (!serviceResponse.success) {
                throw new Error('AI 서비스 생성 실패');
            }

            const serviceId = serviceResponse.data.id;

            // 4. 태그 생성
            if (formData.tags) {
                const tags = formData.tags.split(',').map(tag => tag.trim());
                for (const tag of tags) {
                    await aiServiceTagApi.createAIServiceTag({
                        ai_service_id: serviceId,
                        tag_name: tag
                    });
                }
            }

            // 5. 썸네일 콘텐츠 생성
            if (thumbnailUrl) {
                await aiServiceContentApi.createContent({
                    ai_service_id: serviceId,
                    content_title: '대표이미지',
                    content_url: thumbnailUrl,
                    content_type: 'image',
                    content_description: 'AI 서비스 대표 이미지',
                    content_order_index: 1
                });
            }

            // 6. 아이콘 콘텐츠 생성
            if (iconUrl) {
                await aiServiceContentApi.createContent({
                    ai_service_id: serviceId,
                    content_title: '아이콘',
                    content_url: iconUrl,
                    content_type: 'icon',
                    content_description: 'AI 서비스 아이콘',
                    content_order_index: 2
                });
            }

            // 7. 서비스 URL 콘텐츠 생성
            if (formData.service_url) {
                await aiServiceContentApi.createContent({
                    ai_service_id: serviceId,
                    content_title: formData.ai_name,
                    content_url: formData.service_url,
                    content_type: 'url',
                    content_description: 'AI 서비스 공식 URL',
                    content_order_index: 3
                });
            }

            alert('AI 서비스가 성공적으로 등록되었습니다!');
            window.location.href = '/category';

        } catch (error) {
            console.error('AI 서비스 등록 오류:', error);
            alert('AI 서비스 등록에 실패했습니다.');
        }
    };

    return (
        <>
            <Header />
            <main className="w-full min-h-screen flex items-center justify-center pt-20 pb-20 bg-gray-50">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 서비스 등록</h1>
                        <p className="text-gray-600">새로운 AI 서비스를 등록해주세요</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 기본 정보 */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    서비스명 *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.ai_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ai_name: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="AI 서비스명을 입력하세요"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    서비스 타입 *
                                </label>
                                <select
                                    required
                                    value={formData.ai_type}
                                    onChange={(e) => setFormData(prev => ({ ...prev, ai_type: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="LLM">LLM</option>
                                    <option value="Vision">Vision</option>
                                    <option value="Audio">Audio</option>
                                    <option value="Agent">Agent</option>
                                    <option value="Tool">Tool</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                서비스 URL
                            </label>
                            <input
                                type="url"
                                value={formData.service_url}
                                onChange={(e) => setFormData(prev => ({ ...prev, service_url: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                설명 *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.ai_description}
                                onChange={(e) => setFormData(prev => ({ ...prev, ai_description: e.target.value }))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="AI 서비스에 대한 설명을 입력하세요"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    국가 *
                                </label>
                                <select
                                    required
                                    value={formData.nationality}
                                    onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="한국">한국</option>
                                    <option value="미국">미국</option>
                                    <option value="중국">중국</option>
                                    <option value="일본">일본</option>
                                    <option value="기타">기타</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    태그
                                </label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="쉼표로 구분하여 입력 (예: AI, 챗봇, 자동화)"
                                />
                            </div>
                        </div>

                        {/* 카테고리 선택 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                카테고리 선택
                            </label>
                            <div className="grid grid-cols-3 gap-4 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-4">
                                {categories.map((category) => (
                                    <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.category_ids.includes(category.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        category_ids: [...prev.category_ids, category.id]
                                                    }));
                                                } else {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        category_ids: prev.category_ids.filter(id => id !== category.id)
                                                    }));
                                                }
                                            }}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">{category.category_name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 파일 업로드 */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* 썸네일 업로드 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    대표 이미지
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive.thumbnail ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                        }`}
                                    onDragEnter={(e) => handleDrag(e, 'thumbnail')}
                                    onDragLeave={(e) => handleDrag(e, 'thumbnail')}
                                    onDragOver={(e) => handleDrag(e, 'thumbnail')}
                                    onDrop={(e) => handleDrop(e, 'thumbnail')}
                                >
                                    {thumbnailFile ? (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">{thumbnailFile.name}</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setThumbnailFile(null);
                                                }}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-gray-500 mb-2">파일을 드래그하거나 클릭하여 선택</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileSelect(e, 'thumbnail')}
                                                className="hidden"
                                                id="thumbnail-upload"
                                            />
                                            <label
                                                htmlFor="thumbnail-upload"
                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer"
                                            >
                                                파일 선택
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* 아이콘 업로드 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    아이콘
                                </label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive.icon ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                        }`}
                                    onDragEnter={(e) => handleDrag(e, 'icon')}
                                    onDragLeave={(e) => handleDrag(e, 'icon')}
                                    onDragOver={(e) => handleDrag(e, 'icon')}
                                    onDrop={(e) => handleDrop(e, 'icon')}
                                >
                                    {iconFile ? (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">{iconFile.name}</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIconFile(null);
                                                }}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-gray-500 mb-2">파일을 드래그하거나 클릭하여 선택</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileSelect(e, 'icon')}
                                                className="hidden"
                                                id="icon-upload"
                                            />
                                            <label
                                                htmlFor="icon-upload"
                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer"
                                            >
                                                파일 선택
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 제출 버튼 */}
                        <div className="flex justify-end space-x-4 pt-6">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                AI 서비스 등록
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AIServiceRegisterPage;
