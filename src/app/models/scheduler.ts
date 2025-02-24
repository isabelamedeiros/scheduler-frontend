export interface Scheduler {
    id?: number;
    originAccount: string;
    destinationAccount: string;
    transferValue: number;
    tax: number;
    transferDate: string;
    schedulingDate: string;
  }