import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { RecentactivityComponent } from './recentactivity/recentactivity.component';
import { EmotiongraphComponent } from './emotiongraph/emotiongraph.component';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { MoodechoComponent } from './moodecho/moodecho.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LogjournalComponent } from './logjournal/logjournal.component';
import { JournalenteryproxyService } from './journalenteryproxy.service';

@NgModule({
  declarations: [
    AppComponent,
    RecentactivityComponent,
    EmotiongraphComponent,
    MoodechoComponent,
    DashboardpageComponent,
    WelcomepageComponent,
    LogjournalComponent  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [JournalenteryproxyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
