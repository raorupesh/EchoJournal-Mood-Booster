import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface EmotionEntry {
  id?: string;
  moodScore: number;
  feelings: string[];
  people: string[];
  place: string[];
  date?: Date;
  userId?: string;
}

export interface DailySummary {
  date: string;
  journalEntriesCount: number;
  emotionEntriesCount: number;
  averageMoodScore: number;
  moodDescription: string;
  todaysFeelings: string[];
  hasEntries: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmotionentryproxyService {
  // this will be azure URL as we expose this in express server
  private apiUrl = '/api/v2/emotion/'; // This will be proxied to your MongoDB backend

  constructor(private http: HttpClient) { }
  createEmotionEntry(entry: EmotionEntry): Observable<{ success: boolean, data: EmotionEntry }> {
    return this.http.post<{ success: boolean, data: EmotionEntry }>(this.apiUrl, entry, { withCredentials: true });
  }

  getEmotionEntryById(id: string): Observable<{ success: boolean, data: EmotionEntry }> {
  return this.http.get<{ success: boolean, data: EmotionEntry }>(`${this.apiUrl}${id}`, { withCredentials: true });
  }

  updateEmotionEntry(id: string, entry: Partial<EmotionEntry>): Observable<{ success: boolean }> {
    return this.http.put<{ success: boolean }>(`${this.apiUrl}${id}`, entry, { withCredentials: true });
  }

  deleteEmotionEntry(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}${id}`, { withCredentials: true });
  }

  // Calls the recent emotion entries endpoint
  getRecentEntries(): Observable<{ success: boolean, data: EmotionEntry[] }> {
    return this.http.get<{ success: boolean, data: EmotionEntry[] }>(`${this.apiUrl}monthly`, { withCredentials: true });
  }

  getAllEntries(): Observable<{ success: boolean, entries: EmotionEntry[] }> {
  return this.http.get<{ success: boolean, data: EmotionEntry[] }>(`${this.apiUrl}all`, { withCredentials: true })
    .pipe(
      map((response) => ({
        success: response.success,
        entries: response.data
      }))
    );
  }

  getDailySummary(): Observable<{ success: boolean, data: DailySummary }> {
    return this.http.get<{ success: boolean, data: DailySummary }>('/api/v2/emotion/daily/summary', { withCredentials: true });
  }
}