import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Unit } from '../../models/interfaces';

@Component({
  selector: 'app-available-units',
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">Available Units</h2>
      <div class="alert alert-danger" *ngIf="error">
        {{error}}
      </div>
      <div class="list-group">
        <div *ngFor="let unit of availableUnits" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">Unit {{unit.unit_number}}</h5>
              <small>Property: {{unit.property_name}} - Floor {{unit.floor_number}}</small>
            </div>
            <button class="btn btn-primary" 
                    (click)="bookUnit(unit.id)" 
                    [disabled]="isLoading">
              {{ isLoading ? 'Booking...' : 'Book Unit' }}
            </button>
          </div>
        </div>
        <div *ngIf="availableUnits.length === 0" class="list-group-item">
          No available units
        </div>
      </div>
    </div>
    <app-login-dialog #loginDialog></app-login-dialog>
  `
})
export class AvailableUnitsComponent implements OnInit {
  @ViewChild('loginDialog') loginDialog!: LoginDialogComponent;
  availableUnits: Unit[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAvailableUnits();
  }

  loadAvailableUnits() {
    this.apiService.getAvailableUnits().subscribe({
      next: (data) => {
        this.availableUnits = data;
        this.error = null;
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = 'Error loading available units';
      }
    });
  }

  async bookUnit(unitId: number) {
    if (!this.authService.isAuthenticated()) {
      const authenticated = await this.loginDialog.show();
      if (!authenticated) return;
    }

    this.isLoading = true;
    this.error = null;
    
    this.apiService.bookUnit(unitId).subscribe({
      next: () => {
        this.loadAvailableUnits();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.status === 401 
          ? 'Authentication required to book units' 
          : 'Error booking unit';
        this.isLoading = false;
      }
    });
  }
}