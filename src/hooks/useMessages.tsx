import { useState, useEffect, useCallback } from "react";
import { messagesApi, Message } from "@/services/messagesApi";

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await messagesApi.getAll();
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError('Failed to connect to server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (message: Omit<Message, '_id' | 'createdAt'>) => {
    try {
      const newMessage = await messagesApi.send(message);
      return newMessage;
    } catch (err) {
      console.error('Failed to send message:', err);
      throw err;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await messagesApi.delete(id);
      setMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (err) {
      console.error('Failed to delete message:', err);
      throw err;
    }
  };

  return {
    messages,
    isLoading,
    error,
    refetch: fetchMessages,
    sendMessage,
    deleteMessage,
  };
};
