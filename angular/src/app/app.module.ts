import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { RecentactivityComponent } from './recentactivity/recentactivity.component';
import { EmotiongraphComponent } from './emotiongraph/emotiongraph.component';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { MoodechoComponent } from './moodecho/moodecho.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { LogjournalComponent } from './logjournal/logjournal.component';
import { JournalentryproxyService } from './journalentryproxy.service';
import { EmotionentryproxyService } from './emotionentryproxy.service';
import { AuthproxyService } from './authproxy.service';

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
    HttpClientModule,
  ],
  providers: [JournalentryproxyService, EmotionentryproxyService, AuthproxyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
