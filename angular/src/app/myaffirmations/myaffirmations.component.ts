import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AffirmationproxyService, Affirmation } from '../affirmationproxy.service';

@Component({
  selector: 'app-myaffirmations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './myaffirmations.component.html',
  styleUrl: './myaffirmations.component.css'
})
export class MyaffirmationsComponent implements OnInit {
  affirmations: Affirmation[] = [];
  loading = true;
  error = false;

  constructor(private affirmationService: AffirmationproxyService) {}
  
  ngOnInit(): void {
    this.loadAffirmations();
  }
  
  loadAffirmations(): void {
    this.loading = true;
    this.affirmationService.getAllAffirmations().subscribe({
      next: (response) => {
        if (response && response.success) {
          this.affirmations = response.data;
          // Sort by date, newest first
          this.affirmations.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        this.loading = false;
        console.log('Affirmations loaded:', this.affirmations);
      },
      error: (err) => {
        console.error('Error fetching affirmations:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
  
  // Format date for better display
  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}