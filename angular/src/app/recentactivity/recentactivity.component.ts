import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalEntry, JournalenteryproxyService } from '../journalenteryproxy.service';

interface ActivityEntry {
  date: string;
  text: string;
  emoji: string;
}

@Component({
  selector: 'app-recentactivity',
  standalone: true, // Required if using `imports` directly
  imports: [CommonModule],
  templateUrl: './recentactivity.component.html',
  styleUrls: ['./recentactivity.component.css']
})
export class RecentactivityComponent implements OnInit {
  recentEntries: ActivityEntry[] = [];
  noRecentEntriesMessage = 'No recent entries available.';

  constructor(private journalService: JournalenteryproxyService) {}

  ngOnInit(): void {
this.journalService.getRecentEntries().subscribe(
  (response: { success: boolean; entries: JournalEntry[] }) => {
    if (response && response.success && response.entries && response.entries.length > 0) {
      // Display only the top 3 entries
      this.recentEntries = response.entries
        .slice(0, 3)
        .map((entry: JournalEntry) => ({
          date: entry.date ? new Date(entry.date).toLocaleString() : '',
          text: entry.content.length > 50
            ? entry.content.substring(0, 50) + '...'
            : entry.content,
          emoji: '📝'
      }));
    } else {
      // Clear the array so our template can display the static message
      this.recentEntries = [];
    }
  },
  error => {
    console.error('Error fetching recent journal entries', error);
    this.recentEntries = [];
  }
);
  }
}
