import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmotionentryproxyService, EmotionEntry } from '../emotionentryproxy.service'; // make sure the path is correct

@Component({
  selector: 'app-moodechohistory',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './moodechohistory.component.html',
  styleUrls: ['./moodechohistory.component.css']
})
export class MoodechohistoryComponent implements OnInit {
  moodEntries: EmotionEntry[] = [];
  loading = false;
  error = false;

  constructor(
    private emotionService: EmotionentryproxyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMoodEntries();
  }

  fetchMoodEntries(): void {
    this.loading = true;
    this.error = false;

    this.emotionService.getAllEntries().subscribe({
      next: (res) => {
        this.moodEntries = res.entries;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load mood echo entries', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Navigate to the edit page
  onEdit(id: string | undefined): void {
    if (!id) return;
    this.router.navigate(['/moodecho/edit', id]);
  }

  // Call delete and update local list
  onDelete(id: string | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this entry?')) {
      this.emotionService.deleteEmotionEntry(id).subscribe({
        next: () => {
          this.moodEntries = this.moodEntries.filter(entry => entry.id !== id);
        },
        error: (err) => {
          console.error('Failed to delete entry:', err);
          alert('Delete failed. Please try again.');
        }
      });
    }
  }
}
