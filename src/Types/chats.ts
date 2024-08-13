export interface Chat {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    name: string;
    client_id: number;
    is_group: boolean;
    is_deleted: boolean;
    status?: "active" | "offline" | "away"; // Customize as needed
    lastOnline?: string;
}

export interface ChatResponse {
    list: Chat[];
}
