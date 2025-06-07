import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface JournalEntry {
  id?: string;
  userId?: string;
  content: string;
  feelings: string[];
  date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class JournalentryproxyService {
  //private apiUrl = 'http://localhost:8080/api/v2/journal/'; // This will be proxied to your MongoDB backend
  private apiUrl = 'https://echojournal-crgagzdufjfqgwbf.westus-01.azurewebsites.net/api/v2/journal/'; // This will be proxied to your MongoDB backend

  constructor(private http: HttpClient) { }
  createJournalEntry(entry: JournalEntry): Observable<{ success: boolean, data: JournalEntry }> {
    return this.http.post<{ success: boolean, data: JournalEntry }>(this.apiUrl, entry, { withCredentials: true });
  }
  
  
  getRecentEntries(): Observable<{ success: boolean, entries: JournalEntry[] }> {
    return this.http.get<{ success: boolean, data: JournalEntry[] }>(`${this.apiUrl}recent`, { withCredentials: true })
      .pipe(
        map((response: any) => ({
          success: response.success,
          entries: response.data
        }))
      );
  }

  getAllEntries(): Observable<{ success: boolean, entries: JournalEntry[] }> {
    return this.http.get<{ success: boolean, entries: JournalEntry[] }>(`${this.apiUrl}all`, { withCredentials: true });
  }
  
  getEntryById(id: string): Observable<{ success: boolean, data: JournalEntry }> {
    return this.http.get<{ success: boolean, data: JournalEntry }>(`${this.apiUrl}${id}`, { withCredentials: true });
  }
  
  deleteJournalEntry(id: string): Observable<any> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}${id}`, { withCredentials: true });
  }

  updateJournalEntry(id: string, entry: Partial<JournalEntry>): Observable<any> {
    return this.http.put<{ success: boolean }>(`${this.apiUrl}${id}`, entry, { withCredentials: true });
  }
}