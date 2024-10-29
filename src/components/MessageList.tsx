import * as React from 'react';
import { ListView } from '@nativescript/core';
import { Message } from '../services/messageService';

interface MessageListProps {
  messages: Message[];
  onMessageRead: (messageId: string) => void;
  currentTheme: 'light' | 'dark';
}

export function MessageList({ messages, onMessageRead, currentTheme }: MessageListProps) {
  const cellFactory = (message: Message) => {
    return (
      <gridLayout
        className={`p-4 m-2 rounded-lg ${
          currentTheme === 'dark' 
            ? 'bg-gray-800 text-white' 
            : 'bg-white text-black'
        }`}
        rows="auto, auto"
        columns="*, auto"
        onTap={() => onMessageRead(message.id)}
      >
        <label 
          row={0} 
          col={0} 
          text={message.content}
          className="text-lg font-semibold"
        />
        <label 
          row={1} 
          col={0} 
          text={new Date(message.date).toLocaleDateString()}
          className="text-sm opacity-70"
        />
        {message.read && (
          <label 
            row={0} 
            col={1} 
            text="✓"
            className="text-green-500"
          />
        )}
      </gridLayout>
    );
  };

  return (
    <listView
      items={messages}
      cellFactory={cellFactory}
      className={`flex-1 ${
        currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    />
  );
}