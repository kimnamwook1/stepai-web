import { useState, useEffect } from 'react';
import { ApiResponse } from '@/types/api';

interface UseApiOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    enabled?: boolean;
}

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

/**
 * API 호출을 위한 커스텀 훅
 * @param apiCall API 호출 함수
 * @param options 옵션 (onSuccess, onError, enabled)
 * @returns { data, loading, error, refetch }
 */
export function useApi<T>(
    apiCall: () => Promise<ApiResponse<T>>,
    options: UseApiOptions<T> = {}
): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { onSuccess, onError, enabled = true } = options;

    const fetchData = async () => {
        if (!enabled) return;

        setLoading(true);
        setError(null);

        try {
            const response = await apiCall();
            setData(response.data);
            onSuccess?.(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [enabled]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
    };
}

/**
 * 무한 스크롤을 위한 API 훅
 * @param apiCall API 호출 함수 (page 파라미터 포함)
 * @param options 옵션
 * @returns { data, loading, error, hasMore, loadMore }
 */
export function useInfiniteApi<T>(
    apiCall: (page: number) => Promise<ApiResponse<{ data: T[]; total: number; page: number; totalPages: number }>>,
    options: UseApiOptions<T[]> = {}
): {
    data: T[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
} {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { onSuccess, onError } = options;

    const fetchData = async (pageNum: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiCall(pageNum);
            const { data: newData, total, page: currentPage, totalPages } = response.data;

            if (pageNum === 1) {
                setData(newData);
            } else {
                setData(prev => [...prev, ...newData]);
            }

            setHasMore(currentPage < totalPages);
            setPage(currentPage + 1);
            onSuccess?.(newData);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchData(page);
        }
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    return {
        data,
        loading,
        error,
        hasMore,
        loadMore,
    };
}
