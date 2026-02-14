/**
 * API client for wardrobe-manager backend.
 * In dev, Vite proxies /api to the backend (see vite.config.ts).
 */

const BASE = (import.meta.env.VITE_API_URL as string) || '';

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { message?: string }).message || res.statusText || 'Request failed');
  }
  return data as T;
}

export const api = {
  auth: {
    login: (userId: string, password: string) =>
      request<{ success: boolean; token?: string; message?: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ userId, password }),
      }),
  },

  dashboard: {
    getStats: () =>
      request<{
        todayInwards: number;
        todayOutwards: number;
        totalStockKgs: number;
        monthlyGrowthPercent: number;
      }>('/api/dashboard/stats'),
  },

  clothInwards: {
    list: (params?: { limit?: number; offset?: number }) => {
      const sp = new URLSearchParams();
      if (params?.limit != null) sp.set('limit', String(params.limit));
      if (params?.offset != null) sp.set('offset', String(params.offset));
      const q = sp.toString();
      return request<{ records: ClothInwardRecord[]; total: number }>(
        `/api/cloth-inwards${q ? `?${q}` : ''}`
      );
    },
    create: (body: { formData: Record<string, unknown>; items: ClothItem[] }) =>
      request<ClothInwardRecord>('/api/cloth-inwards', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },

  clothOutwards: {
    list: (params?: { limit?: number; offset?: number }) => {
      const sp = new URLSearchParams();
      if (params?.limit != null) sp.set('limit', String(params.limit));
      if (params?.offset != null) sp.set('offset', String(params.offset));
      const q = sp.toString();
      return request<{ records: ClothOutwardRecord[]; total: number }>(
        `/api/cloth-outwards${q ? `?${q}` : ''}`
      );
    },
    create: (body: { formData: Record<string, unknown>; items: ClothItem[] }) =>
      request<ClothOutwardRecord>('/api/cloth-outwards', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
};

export interface ClothItem {
  id: number;
  color: string;
  dia: string;
  fabric: string;
  gg: string;
  rolls: number;
  totKgs: number;
  remarks: string;
}

export interface ClothInwardRecord {
  id: number;
  [key: string]: unknown;
}

export interface ClothOutwardRecord {
  id: number;
  [key: string]: unknown;
}
