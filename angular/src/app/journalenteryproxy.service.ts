import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = '/api/journal'; // This will be proxied to your MongoDB backend

  constructor(private http: HttpClient) { }
  
  createJournalEntry(entry: JournalEntry): Observable<any> {
    return this.http.post(this.apiUrl, entry);
  }
  
  getRecentEntries(limit: number = 5): Observable<any> {
    return this.http.get(`${this.apiUrl}/recent?limit=${limit}`);
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