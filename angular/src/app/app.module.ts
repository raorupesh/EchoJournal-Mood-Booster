import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { RecentactivityComponent } from './recentactivity/recentactivity.component';
import { EmotiongraphComponent } from './emotiongraph/emotiongraph.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardpageComponent,
    RecentactivityComponent,
    EmotiongraphComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
