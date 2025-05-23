import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JournalentryproxyService, JournalEntry } from '../journalentryproxy.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logjournal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logjournal.component.html',
  styleUrl: './logjournal.component.css'
})
export class LogjournalComponent {
  journal: JournalEntry = {
    content: '',
    feelings: []
  };
  
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  
  constructor(
    private journalService: JournalentryproxyService,
    private router: Router
  ) {}
  
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';
    
    // Convert comma-separated strings to arrays
    const journalToSubmit: JournalEntry = {
      content: this.journal.content,
      feelings: this.parseCommaSeparated(this.journal.feelings as unknown as string),
      date: new Date()
    };
    
    this.journalService.createJournalEntry(journalToSubmit).subscribe({
      next: (response) => {
        console.log('Journal entry saved:', response);
        this.isSubmitting = false;
        this.successMessage = 'Journal entry saved successfully!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error saving journal entry:', error);
        this.isSubmitting = false;
        this.errorMessage = `Error saving journal entry: ${error.message || 'Unknown error'}`;
      }
    });
  }
  
  parseCommaSeparated(input: string): string[] {
    if (!input) return [];
    return input.split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
  
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}