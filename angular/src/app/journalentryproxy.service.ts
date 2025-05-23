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
  private apiUrl = 'http://localhost:8080/api/v1/journal/'; // This will be proxied to your MongoDB backend

  constructor(private http: HttpClient) { }

  createJournalEntry(entry: JournalEntry): Observable<{ success: boolean, data: JournalEntry }> {
    return this.http.post<{ success: boolean, data: JournalEntry }>(this.apiUrl, entry);
  }
  
  
  getRecentEntries(): Observable<{ success: boolean, entries: JournalEntry[] }> {
    return this.http.get<{ success: boolean, data: JournalEntry[] }>(`${this.apiUrl}recent`)
      .pipe(
        map((response: any) => ({
          success: response.success,
          entries: response.data
        }))
      );
  }

  getAllEntries(): Observable<{ success: boolean, entries: JournalEntry[] }> {
    return this.http.get<{ success: boolean, entries: JournalEntry[] }>(`${this.apiUrl}all`);
  }
  
  getEntryById(id: string): Observable<{ success: boolean, data: JournalEntry }> {
    return this.http.get<{ success: boolean, data: JournalEntry }>(`${this.apiUrl}${id}`);
  }
  
  deleteEntry(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
  
  updateEntry(id: string, entry: Partial<JournalEntry>): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, entry);
  }
}