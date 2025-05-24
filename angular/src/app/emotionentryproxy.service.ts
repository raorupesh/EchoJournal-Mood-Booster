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
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmotionentryproxyService {
  private apiUrl = 'http://localhost:8080/api/v1/emotion/'; // This will be proxied to your MongoDB backend

  constructor(private http: HttpClient) { }

  createEmotionEntry(entry: EmotionEntry): Observable<{ success: boolean, data: EmotionEntry }> {
    return this.http.post<{ success: boolean, data: EmotionEntry }>(this.apiUrl, entry);
  }

  getEmotionEntryById(id: string): Observable<{ success: boolean, data: EmotionEntry }> {
  return this.http.get<{ success: boolean, data: EmotionEntry }>(`${this.apiUrl}${id}`);
  }

  updateEmotionEntry(id: string, entry: Partial<EmotionEntry>): Observable<{ success: boolean }> {
    return this.http.put<{ success: boolean }>(`${this.apiUrl}${id}`, entry);
  }

  deleteEmotionEntry(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}${id}`);
  }

  // Calls the recent emotion entries endpoint
  getRecentEntries(): Observable<{ success: boolean, data: EmotionEntry[] }> {
    return this.http.get<{ success: boolean, data: EmotionEntry[] }>(`${this.apiUrl}monthly`);
  }

  getAllEntries(): Observable<{ success: boolean, entries: EmotionEntry[] }> {
  return this.http.get<{ success: boolean, data: EmotionEntry[] }>(`${this.apiUrl}all`)
    .pipe(
      map((response) => ({
        success: response.success,
        entries: response.data
      }))
    );
  } 
}