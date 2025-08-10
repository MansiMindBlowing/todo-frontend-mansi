export interface Todo {
    id: string;
    title: string;
    desc: string;
    status: 'todo' | 'in-progress' | 'on-hold' | 'done' | 'will-not-do';
    priority: 'low' | 'medium' | 'high' | 'critical';
    expected_completion: string;
    user_id: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}