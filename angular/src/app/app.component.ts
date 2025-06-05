import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthproxyService } from './authproxy.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'EchoJournal';

  constructor(public authService: AuthproxyService, private router: Router) {}

  ngOnInit() {
    // Check authentication status when component loads
    this.authService.checkAuthStatus().subscribe();
  }

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/welcome']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}
