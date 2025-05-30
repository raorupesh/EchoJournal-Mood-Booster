import { Routes } from '@angular/router';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LogjournalComponent } from './logjournal/logjournal.component';
import { MoodechoComponent } from './moodecho/moodecho.component';
import { MyaffirmationsComponent } from './myaffirmations/myaffirmations.component';
import { JournalhistoryComponent } from './journalhistory/journalhistory.component';
import { JournalpageComponent } from './journalpage/journalpage.component';
import { MoodechohistoryComponent } from './moodechohistory/moodechohistory.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardpageComponent },
  { path: 'journalhistory', component: JournalhistoryComponent },
  { path: 'moodechohistory', component: MoodechohistoryComponent },
  { path: 'journal/:id', component: JournalpageComponent },
  { path: 'logjournal', component: LogjournalComponent },
  { path: 'logjournal/:id', component: LogjournalComponent },
  { path: 'moodecho/edit/:id', component: MoodechoComponent },
  { path: 'moodecho/new', component: MoodechoComponent },
  { path: 'myaffirmations', component: MyaffirmationsComponent },
  { path: 'welcome', component: WelcomepageComponent },
  { path: '**', redirectTo: 'welcome' }
];