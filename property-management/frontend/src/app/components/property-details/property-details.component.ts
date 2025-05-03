import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-property-details',
  template: `
    <div class="container mt-4" *ngIf="property">
      <div class="alert alert-danger" *ngIf="error">
        {{error}}
      </div>
      
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">{{property.name}}</h2>
          <p class="card-text">Address: {{property.address}}</p>
        </div>
      </div>
      
      <div class="mt-4">
        <div *ngFor="let floor of property.floors" class="card mb-3">
          <div class="card-header">
            <h3 class="mb-0">Floor {{floor.floor_number}}</h3>
          </div>
          <div class="card-body">
            <div *ngFor="let unit of floor.units" class="d-flex justify-content-between align-items-center mb-2">
              <span>Unit {{unit.unit_number}} - 
                <span [class]="unit.status === 'available' ? 'text-success' : 'text-danger'">
                  {{unit.status}}
                </span>
              </span>
              <button *ngIf="unit.status === 'available'" 
                      class="btn btn-primary"
                      (click)="bookUnit(unit.id)"
                      [disabled]="isLoading">
                {{ isLoading ? 'Booking...' : 'Book Unit' }}
              </button>
            </div>
            <div *ngIf="floor.units?.length === 0" class="text-muted">
              No units on this floor
            </div>
          </div>
        </div>
        <div *ngIf="property.floors?.length === 0" class="alert alert-info">
          No floors added to this property yet
        </div>
      </div>
    </div>
    <app-login-dialog #loginDialog></app-login-dialog>
  `
})
export class PropertyDetailsComponent implements OnInit {
  @ViewChild('loginDialog') loginDialog!: LoginDialogComponent;
  property: any;
  isLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadPropertyDetails(params['id']);
      }
    });
  }

  loadPropertyDetails(id: number) {
    this.apiService.getPropertyDetails(id).subscribe({
      next: (data) => {
        this.property = data;
        this.error = null;
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = 'Error loading property details';
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
        this.loadPropertyDetails(this.property.id);
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