interface ChatStatus {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    user_id: number;
    chat_id: number;
    parent_chat_id: number | null;
    delivered: boolean;
    read: boolean;
}

interface ChatFiles {
    id: number;
    chat_id: number;
    chat_reply_id: number | null;
    user_id: number;
    file_url: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    is_deleted: boolean;
}

export interface ChatReaction {
    id: number;                
    chat_id: number;           
    chat_reply_id: number | null; 
    user_id: number;           
    reaction_code: string;   
    is_deleted: boolean;       
    createdAt: string;        
    updatedAt: string;        
    deletedAt: string | null;  
}

  
export interface ChatMessage {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    chatFiles: ChatFiles[];
    chatReactions: ChatReaction[];
    chatStatus: ChatStatus[];
    sender_id: number;
    receiver_id: number | null;
    message: string;
    chat_room_id: number;
    is_reply: boolean;
    parent_chat_id: number | null;
    is_deleted: boolean;
}

export interface Messages {
    length: number;
    chatsList: ChatMessage[];
}

export interface ChatData {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    chatFiles: ChatFiles[];
    sender_id: number;
    receiver_id: number;
    message: string | null;
    chat_room_id: number;
    is_reply: boolean;
    parent_chat_id: number | null;
    is_deleted: boolean;
}

export interface PinnedChat {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    client_id: number;
    chat_room_id: number;
    chat_id: number;
    chat_data: ChatData;
    user_id: number;
    is_deleted: boolean;
}

export interface ConversationsType {
    id: number;
    updatedAt: string;
    createdAt: string;
    deletedAt: string | null;
    name: string;
    client_id: number;
    is_group: boolean;
    profile_pic: string | null;
    is_deleted: boolean;
    messages: Messages;
    pinnedChat: PinnedChat[];
    unreadMsgs: {chat_id: number}[]
}

export interface ConversationsTypeResponse{
    list: ConversationsType[]
}