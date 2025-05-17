import { Routes } from '@angular/router';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardpageComponent,
    },
    {
        path: '',
        component: WelcomepageComponent
    }

];
