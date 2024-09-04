import moment from 'moment';
import { ChatMessage } from '../Types/conversationsType';

interface TaggedItem {
  type: 'date' | 'message';
  tag?: string;
  message?: ChatMessage;
}

export const formatDateTag = (date: string): string => {
  const messageDate = moment(date);
  const now = moment();

  if (messageDate.isSame(now, 'day')) {
    return 'Today';
  } else

  if (messageDate.isSame(now.subtract(1, 'days'), 'day')) {
    return 'Yesterday';
  } else

  if (messageDate.isSame(now, 'week')) {
    return messageDate.format('dddd'); // Day of the week
  } else

  if (messageDate.isSame(now, 'year')) {
    return messageDate.format('MMMM, D'); // Day of the month
  } else

  return messageDate.format('D MMMM YYYY'); // Different year
};

export const addDateTags = (messages: ChatMessage[]): TaggedItem[] => {
  const taggedMessages: TaggedItem[] = [];
  let lastMessageDate: moment.Moment | null = null;

  messages.forEach((message) => {
    const messageDate = moment(message.createdAt);

    if (!lastMessageDate || !messageDate.isSame(lastMessageDate, 'day')) {
      taggedMessages.push({
        type: 'date',
        tag: formatDateTag(message.createdAt),
      });
    }

    taggedMessages.push({
      type: 'message',
      message,
    });

    lastMessageDate = messageDate;
  });

  return taggedMessages;
};
