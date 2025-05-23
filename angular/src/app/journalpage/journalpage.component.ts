import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { JournalentryproxyService, JournalEntry } from '../journalentryproxy.service';

@Component({
  selector: 'app-journalpage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './journalpage.component.html',
  styleUrl: './journalpage.component.css'
})
export class JournalpageComponent implements OnInit {
  journalEntry: JournalEntry | null = null;
  loading = true;
  error = false;
  errorMessage = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private journalService: JournalentryproxyService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.fetchJournalEntry(id);
      } else {
        this.error = true;
        this.errorMessage = 'Journal entry ID not found';
        this.loading = false;
      }
    });
  }
  
  fetchJournalEntry(id: string): void {
    this.loading = true;
    this.journalService.getEntryById(id).subscribe({
      next: (response) => {
        if (response && response.success) {
          this.journalEntry = response.data;
        } else {
          this.error = true;
          this.errorMessage = 'Failed to load journal entry';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching journal entry:', err);
        this.error = true;
        this.errorMessage = 'Error loading journal entry. Please try again later.';
        this.loading = false;
      }
    });
  }
  
  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  goBack(): void {
    this.router.navigate(['/journalhistory']);
  }
}
