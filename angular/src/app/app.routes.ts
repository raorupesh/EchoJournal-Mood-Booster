import { Routes } from '@angular/router';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LogjournalComponent } from './logjournal/logjournal.component';
import { MoodechoComponent } from './moodecho/moodecho.component';
import { MyaffirmationsComponent } from './myaffirmations/myaffirmations.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardpageComponent },
  { path: 'journalenteries', component: LogjournalComponent },
  { path: 'emotionalenteries', component: MoodechoComponent },
  { path: 'myaffirmations', component: MyaffirmationsComponent },
  { path: 'welcome', component: WelcomepageComponent },
  { path: '**', redirectTo: 'welcome' }
];