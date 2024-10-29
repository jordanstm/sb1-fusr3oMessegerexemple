import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { MessageService, Message } from '../services/messageService';
import { MessageList } from './MessageList';
import { Calendar } from './Calendar';

type ScreenOneProps = {
    route: RouteProp<MainStackParamList, "One">,
    navigation: FrameNavigationProp<MainStackParamList, "One">,
};

export function ScreenOne({ navigation }: ScreenOneProps) {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
    const [readDates, setReadDates] = React.useState<string[]>([]);

    React.useEffect(() => {
        const subscription = MessageService.getMessages().subscribe(
            (newMessages) => setMessages(newMessages),
            (error) => Dialogs.alert("Error fetching messages: " + error)
        );

        return () => subscription.unsubscribe();
    }, []);

    const handleMessageRead = async (messageId: string) => {
        try {
            await MessageService.markAsRead(messageId);
            const message = messages.find(m => m.id === messageId);
            if (message) {
                setReadDates([...readDates, message.date]);
            }
            setMessages(messages.map(m => 
                m.id === messageId ? { ...m, read: true } : m
            ));
        } catch (error) {
            Dialogs.alert("Error marking message as read");
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <flexboxLayout 
            className={`flex-1 ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
            }`}
        >
            <button
                className={`m-2 p-2 rounded ${
                    theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
                }`}
                onTap={toggleTheme}
                text={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Theme`}
            />
            
            <Calendar readDates={readDates} currentTheme={theme} />
            
            <MessageList 
                messages={messages}
                onMessageRead={handleMessageRead}
                currentTheme={theme}
            />
        </flexboxLayout>
    );
}