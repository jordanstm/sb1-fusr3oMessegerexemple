import { Observable, interval } from 'rxjs';
import { Http } from '@nativescript/core';

export interface Message {
  id: string;
  content: string;
  date: string;
  read: boolean;
}

export class MessageService {
  private static API_URL = 'http://localhost:3000/messages';
  private static POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

  public static getMessages(): Observable<Message[]> {
    return new Observable((subscriber) => {
      interval(this.POLL_INTERVAL).subscribe(() => {
        Http.getJSON<Message[]>(this.API_URL)
          .then((messages) => subscriber.next(messages))
          .catch((error) => subscriber.error(error));
      });
    });
  }

  public static markAsRead(messageId: string): Promise<void> {
    return Http.request({
      url: `${this.API_URL}/${messageId}`,
      method: 'PATCH',
      content: JSON.stringify({ read: true }),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}