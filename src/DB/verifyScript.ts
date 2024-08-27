import { getAllChatsData, getMessagesByChatIdData } from "./database";

export async function verifyData() {
    // const chats = await getAllChatsData();
    // console.log("Chats:", chats);

    const messages = await getMessagesByChatIdData(3)
    console.log("messages room 3(osborne-kanishk):", messages);

}

verifyData().catch(error => console.error("Error verifying data:", error));