export interface User {
    id: string;
    email: string;
    role: string;
}

export interface TaskFilter {
    search?: string;
    status?: 'pending' | 'in-progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface Task {
    _id: string;
    title: string;
    description?: string | undefined;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    userId: string;
}