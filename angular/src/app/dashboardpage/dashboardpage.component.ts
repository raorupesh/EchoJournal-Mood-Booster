import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RecentactivityComponent } from '../recentactivity/recentactivity.component';
import { EmotiongraphComponent } from '../emotiongraph/emotiongraph.component';
import { EmotionentryproxyService, DailySummary } from '../emotionentryproxy.service';
import { AuthproxyService } from '../authproxy.service';

@Component({
  selector: 'app-dashboardpage',
  standalone: true,
  imports: [CommonModule, RouterModule, RecentactivityComponent, EmotiongraphComponent],
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit {
  dailySummary: DailySummary | null = null;
  isLoadingSummary = true;
  summaryError = false;
  showLoginModal = false;

  constructor(
    private router: Router,
    private emotionService: EmotionentryproxyService,
    private authService: AuthproxyService
  ) { }
  ngOnInit(): void {
    this.authService.authStatus$.subscribe(status => {
      if (!status.authenticated) {
        this.showLoginModal = true;
      } else {
        this.showLoginModal = false;
        this.loadDailySummary();
      }
    });
  }

  loadDailySummary(): void {
    this.isLoadingSummary = true;
    this.emotionService.getDailySummary().subscribe({
      next: (response) => {
        if (response.success) {
          this.dailySummary = response.data;
        } else {
          this.summaryError = true;
        }
        this.isLoadingSummary = false;
      },
      error: (error) => {
        console.error('Error loading daily summary:', error);
        this.summaryError = true;
        this.isLoadingSummary = false;
      }
    });
  }

  openMoodEcho(): void {
    this.router.navigate(['/moodecho/new']);
  }

  openLogJournal(): void {
    this.router.navigate(['/logjournal']);
  }
  openAffirmations(): void {
    this.router.navigate(['/myaffirmations']);
  }

  goToWelcome(): void {
    this.router.navigate(['/welcome']);
  }
}