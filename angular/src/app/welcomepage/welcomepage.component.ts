import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthproxyService } from '../authproxy.service';

@Component({
  selector: 'app-welcomepage',
  imports: [CommonModule],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css',
})
export class WelcomepageComponent {
  constructor(public authService: AuthproxyService) { }

  login() {
    this.authService.login();
  }
}
