import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { JournalentryproxyService, JournalEntry } from '../journalentryproxy.service';

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

  constructor(private journalService: JournalentryproxyService, private router: Router) {}

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

  onEdit(entry: JournalEntry): void {
    if (entry.id) {
      this.router.navigate(['/logjournal', entry.id]);
    }
  }

  onDelete(entry: JournalEntry): void {
    if (!entry.id) return;
    if (confirm('Are you sure you want to delete this journal entry?')) {
      this.journalService.deleteJournalEntry(entry.id).subscribe({
        next: () => {
          this.loadAllEntries(); // This fetches the latest list from the backend
        },
        error: (err: any) => {
          alert('Delete failed. Please try again.');
          console.error('Failed to delete journal entry:', err);
        }
      });
    }
  }
}