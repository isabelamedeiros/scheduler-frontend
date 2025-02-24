import { Routes } from '@angular/router';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

export const routes: Routes = [
  { path: '', redirectTo: '/scheduler', pathMatch: 'full' }, 
  { path: 'scheduler', component: SchedulerComponent },
  { path: '**', redirectTo: '/scheduler' }
];