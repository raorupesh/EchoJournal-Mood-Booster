import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Affirmation {
  id: string;
  userId: string;
  content: string;
  sourceJournalEntry: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})

export class AffirmationproxyService {
  // this will be azure URL as we expose this in express server
  private apiUrl = '/api/v2/affirmations/';

  constructor(private http: HttpClient) { }
  // Get all affirmations for the current user
  getAllAffirmations(): Observable<{ success: boolean, data: Affirmation[] }> {
    return this.http.get<{ success: boolean, data: Affirmation[] }>(`${this.apiUrl}`, { withCredentials: true });
  }

}
