import { Routes } from '@angular/router';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LogjournalComponent } from './logjournal/logjournal.component';
import { MoodechoComponent } from './moodecho/moodecho.component';
import { MyaffirmationsComponent } from './myaffirmations/myaffirmations.component';
import { JournalhistoryComponent } from './journalhistory/journalhistory.component';
import { JournalpageComponent } from './journalpage/journalpage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardpageComponent },
  { path: 'journalhistory', component: JournalhistoryComponent },
  { path: 'journal/:id', component: JournalpageComponent },
  { path: 'journalenteries', component: LogjournalComponent },
  { path: 'emotionalenteries', component: MoodechoComponent },
  { path: 'myaffirmations', component: MyaffirmationsComponent },
  { path: 'welcome', component: WelcomepageComponent },
  { path: '**', redirectTo: 'welcome' }
];