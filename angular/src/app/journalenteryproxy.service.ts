import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface JournalEntry {
  userId?: string;
  content: string;
  feelings: string[];
  date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class JournalenteryproxyService {
  private apiUrl = 'http://localhost:8080/api/v1/journal/'; // This will be proxied to your MongoDB backend

  constructor(private http: HttpClient) { }
  
  createJournalEntry(entry: JournalEntry): Observable<any> {
    return this.http.post(this.apiUrl, entry);
  }
  
  // Calls the recent journal entries endpoint. Adjust response type as per your API.
  getRecentEntries(): Observable<{ success: boolean, entries: JournalEntry[] }> {
    return this.http.get<{ success: boolean, data: JournalEntry[] }>(`${this.apiUrl}recent`)
      .pipe(
        // Map 'data' to 'entries' to match the expected return type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((response: any) => ({
          success: response.success,
          entries: response.data
        }))
      );
  }
  
  getAllEntries(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  getEntryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  deleteEntry(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
  updateEntry(id: string, entry: Partial<JournalEntry>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, entry);
  }
}