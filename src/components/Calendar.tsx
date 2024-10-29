import * as React from 'react';
import { StyleSheet } from 'react-nativescript';
import { GridLayout, Label } from '@nativescript/core';

interface CalendarProps {
  readDates: string[];
  currentTheme: 'light' | 'dark';
}

export function Calendar({ readDates, currentTheme }: CalendarProps) {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i).toISOString().split('T')[0];
      const isRead = readDates.includes(date);
      
      days.push(
        <Label
          key={i}
          className={`text-center p-2 m-1 rounded-lg ${
            isRead ? 'bg-blue-600 text-white' : 
            currentTheme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
          }`}
          text={i.toString()}
        />
      );
    }
    return days;
  };

  return (
    <gridLayout
      className={`p-4 rounded-lg ${
        currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
      rows="auto, auto"
      columns="*, *, *, *, *, *, *"
    >
      {renderDays()}
    </gridLayout>
  );
}