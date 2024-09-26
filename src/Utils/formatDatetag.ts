import { ChatMessage } from "../Types/conversationsType";
import { formatDate } from "./formatDate";

interface TaggedItem {
  type: "date" | "message";
  tag?: string;
  message?: ChatMessage;
}

export const formatDateTag = (date: string): string => {
  const messageDate = new Date(date);
  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.toDateString() === d2.toDateString();
  const isSameWeek = (d1: Date, d2: Date) => {
    const startOfWeek = (d: Date) => {
      const diff = d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    };
    return startOfWeek(d1).getTime() === startOfWeek(d2).getTime();
  };
  const isSameYear = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear();

  if (isSameDay(messageDate, now)) {
    return "Today";
  } else if (isSameDay(messageDate, new Date(now.setDate(now.getDate() - 1)))) {
    return "Yesterday";
  } else if (isSameWeek(messageDate, new Date())) {
    return formatDate(date, "en-US", { weekday: "long" });
  } else if (isSameYear(messageDate, now)) {
    return formatDate(date, "en-US", { month: "long", day: "numeric" });
  } else {
    return formatDate(date, "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};

export const addDateTags = (messages: ChatMessage[]): TaggedItem[] => {
  const taggedMessages: TaggedItem[] = [];
  let lastMessageDate: Date | null = null;

  messages.forEach((message) => {
    const messageDate = new Date(message.createdAt);

    if (!lastMessageDate || !isSameDay(messageDate, lastMessageDate)) {
      taggedMessages.push({
        type: "date",
        tag: formatDateTag(message.createdAt),
      });
    }

    taggedMessages.push({
      type: "message",
      message,
    });

    lastMessageDate = messageDate;
  });

  return taggedMessages;
};

const isSameDay = (d1: Date, d2: Date) =>
  d1.toDateString() === d2.toDateString();
