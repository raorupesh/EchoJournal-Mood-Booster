import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JournalenteryproxyService, JournalEntry } from '../journalenteryproxy.service';

@Component({
  selector: 'app-journalhistory',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './journalhistory.component.html',
  styleUrl: './journalhistory.component.css'
})
export class JournalhistoryComponent implements OnInit {
  journalEntries: JournalEntry[] = [];
  loading = true;
  error = false;
  
  constructor(private journalService: JournalenteryproxyService) {}
  
  ngOnInit(): void {
    this.loadAllEntries();
  }
  
  loadAllEntries(): void {
    this.loading = true;
    this.journalService.getAllEntries().subscribe({
      next: (response) => {
        if (response && response.success) {
          this.journalEntries = response.entries;
          // Sort entries by date descending (newest first)
          this.journalEntries.sort((a, b) => {
            const dateA = new Date(a.date || '');
            const dateB = new Date(b.date || '');
            return dateB.getTime() - dateA.getTime();
          });
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching journal entries:', err);
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
