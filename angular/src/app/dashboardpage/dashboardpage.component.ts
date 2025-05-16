import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentactivityComponent } from '../recentactivity/recentactivity.component';
import { EmotiongraphComponent } from '../emotiongraph/emotiongraph.component';

@Component({
  selector: 'app-dashboardpage',
  imports: [CommonModule, RecentactivityComponent, EmotiongraphComponent],
  templateUrl: './dashboardpage.component.html',
  styleUrl: './dashboardpage.component.css',
})
export class DashboardpageComponent {
  
  openMoodEcho(): void {
    console.log('Mood Echo clicked');
    // Add functionality here when needed
  }

  openLogJournal(): void {
    console.log('Log Journal clicked');
    // Add functionality here when needed
  }

  openAffirmations(): void {
    console.log('My Affirmations clicked');
    // Add functionality here when needed
  }
}
