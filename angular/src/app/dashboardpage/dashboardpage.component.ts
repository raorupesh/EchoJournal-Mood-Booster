import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RecentactivityComponent } from '../recentactivity/recentactivity.component';
import { EmotiongraphComponent } from '../emotiongraph/emotiongraph.component';

@Component({
  selector: 'app-dashboardpage',
  standalone: true,
  imports: [CommonModule, RouterModule, RecentactivityComponent, EmotiongraphComponent],
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent {

  constructor(private router: Router) {}

  openMoodEcho(): void {
    console.log('Mood Echo clicked');
    this.router.navigate(['/moodecho/new']);
  }

  openLogJournal(): void {
    console.log('Log Journal clicked');
    this.router.navigate(['/logjournal']);
  }

  openAffirmations(): void {
    console.log('My Affirmations clicked');
    this.router.navigate(['/myaffirmations']);
  }
}