import { Component, Inject, OnInit } from '@angular/core';
import { SchedulerService } from '../../services/scheduler.service';
import { Scheduler } from '../../models/scheduler';

import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  schedulers: Scheduler[] = []; 
  showForm: boolean = false;
  showSchedulers: boolean = false;
  schedulerForm: FormGroup;

  displayedColumns: string[] = [
    'originAccount',
    'destinationAccount',
    'transferValue',
    'tax',
    'transferDate',
    'schedulingDate'
  ];

  constructor(
    private fb: FormBuilder, 
    private schedulerService: SchedulerService) {
  }

  ngOnInit(): void {
    this.loadSchedulers();
    this.schedulerForm = this.fb.group({
      originAccount: [null, Validators.required],
      destinationAccount: [null, Validators.required],
      transferValue: [null, Validators.required],
      transferDate: [null, Validators.required],
    });
  }

  loadSchedulers(): void {
    this.schedulerService.getSchedulers().subscribe(
      (data) => {
        this.schedulers = data; 
        this.showSchedulers = true; 
        this.showForm = false; 
      },
      (error) => {
        alert(error.error.message)
      }
    );
  }

  createScheduler(): void {
    const newScheduler: Scheduler = {
    originAccount: this.schedulerForm.value.originAccount,
    destinationAccount: this.schedulerForm.value.destinationAccount,
    transferValue: this.schedulerForm.value.transferValue,
    tax: 0,
    schedulingDate: '',
    transferDate: this.schedulerForm.value.transferDate
  };
    this.schedulerService.createScheduler(newScheduler).subscribe(
      (data) => {
        this.schedulers.push(data);
        alert("Agendamento criado com sucesso!")
        this.loadSchedulers()
        this.resetForm(); 
        this.showForm = false;
      },
      (error) => {
        alert(error.error.message)
      }
    );
  }

  resetForm(): void {
      this.schedulerForm.get("originAccount").setValue(""),
      this.schedulerForm.get("destinationAccount").setValue(""),
      this.schedulerForm.get("transferValue").setValue(""),
      this.schedulerForm.get("transferDate").setValue("")
  }
 }