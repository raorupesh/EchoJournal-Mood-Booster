import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface matching the IAffirmationModel
export interface Affirmation {
  id: string;
  userId: number;
  content: string;
  sourceJournalEntry: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})

export class AffirmationproxyService {
  private apiUrl = 'http://localhost:8080/api/v1/affirmations/'; // This will be proxied to your MongoDB backend

  constructor(private http: HttpClient) { }

  // Get all affirmations for the current user
  getAllAffirmations(): Observable<{ success: boolean, data: Affirmation[] }> {
    return this.http.get<{ success: boolean, data: Affirmation[] }>(`${this.apiUrl}`);
  }

}
