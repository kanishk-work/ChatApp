import { getAllChatsData } from "./database";

export async function verifyData() {
    const chats = await getAllChatsData();
    console.log("Chats:", chats);
}

verifyData().catch(error => console.error("Error verifying data:", error));