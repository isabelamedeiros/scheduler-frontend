import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scheduler } from '../models/scheduler';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private apiUrl = 'http://localhost:8080/scheduler';

  constructor(private http: HttpClient) { }

  getSchedulers(): Observable<Scheduler[]> {
    return this.http.get<Scheduler[]>(this.apiUrl);
  }

  createScheduler(scheduler: Scheduler): Observable<Scheduler> {
    return this.http.post<Scheduler>(this.apiUrl, scheduler);
  }
}