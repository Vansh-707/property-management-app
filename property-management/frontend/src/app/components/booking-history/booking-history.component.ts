import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-booking-history',
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Booking History</h2>
      <div class="alert alert-danger" *ngIf="error">
        {{error}}
      </div>
      <div class="list-group">
        <div *ngFor="let record of bookingHistory" class="list-group-item">
          <div>
            <h5 class="mb-1">Unit {{record.unit_number}}</h5>
            <small>Property: {{record.property_name}} - Floor {{record.floor_number}}</small>
            <p class="mb-0">Booked At: {{record.booked_at | date:'medium'}}</p>
          </div>
        </div>
        <div *ngIf="bookingHistory.length === 0" class="list-group-item">
          No booking history available
        </div>
      </div>
    </div>
  `
})
export class BookingHistoryComponent implements OnInit {
  bookingHistory: any[] = [];
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadBookingHistory();
  }

  loadBookingHistory() {
    this.apiService.getBookingHistory().subscribe({
      next: (data) => {
        this.bookingHistory = data;
        this.error = null;
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = 'Error loading booking history';
      }
    });
  }
}