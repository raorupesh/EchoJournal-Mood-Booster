import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
export class LogjournalComponent implements OnInit {
  journal: JournalEntry = {
    content: '',
    feelings: []
  };
  
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  isEditMode: any;
  editId: any;
  feelingsInput: string = '';
  
  constructor(
    private journalService: JournalentryproxyService,
    private router: Router,
    private route: ActivatedRoute
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
      feelings: this.parseCommaSeparated(this.feelingsInput),
      date: this.isEditMode ? this.journal.date : new Date()
    };
    
    if (this.isEditMode && this.editId) {
      this.journalService.updateJournalEntry(this.editId, journalToSubmit).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = 'Journal entry updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/journalhistory']);
          }, 1000);
        },
        error: (error: any) => {
          this.isSubmitting = false;
          this.errorMessage = 'Failed to update journal entry.';
        }
      });
    } else {
        this.journalService.createJournalEntry(journalToSubmit).subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.successMessage = 'Journal entry saved successfully!';
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          },
          error: (error) => {
            console.error('Error saving journal entry:', error);
            this.isSubmitting = false;
            this.errorMessage = `Error saving journal entry: ${error.message || 'Unknown error'}`;
          }
        });
      }
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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.journalService.getEntryById(id).subscribe({
        next: (res) => {
          if (res && res.success && res.data) {
            this.journal = { ...res.data };
            this.feelingsInput = res.data.feelings.join(', ');
            this.isEditMode = true;
            this.editId = id;
          }
        },
        error: (err) => {
          this.errorMessage = 'Failed to load journal entry.';
        }
      });
    }
  }
}