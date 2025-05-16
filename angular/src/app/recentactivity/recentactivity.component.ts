import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActivityEntry {
  date: string;
  text: string;
  emoji: string;
}

@Component({
  selector: 'app-recentactivity',
  imports: [CommonModule],
  templateUrl: './recentactivity.component.html',
  styleUrl: './recentactivity.component.css'
})
export class RecentactivityComponent {
  recentEntries: ActivityEntry[] = [
    {
      date: 'Today, 2:30 PM',
      text: 'Had a productive meeting with the team. Everyone was engaged and we made significant progress.',
      emoji: '😊',
    },
    {
      date: 'Yesterday, 8:15 PM',
      text: 'Quiet day at home. Finished reading that book I\'ve been working on for weeks.',
      emoji: '😌',
    },
    {
      date: 'Apr 12, 10:45 AM',
      text: 'Feeling a bit overwhelmed with all the deadlines coming up. Need to organize my schedule better.',
      emoji: '😓',
    }
  ];
}
