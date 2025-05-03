import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-property-details',
  template: `
    <div class="container mt-4">
      <h2>Property Details</h2>
      <div *ngIf="property">
        <h3>{{ property.name }}</h3>
        <p>{{ property.address }}</p>

        <h4>Floors</h4>
        <ul>
          <li *ngFor="let floor of property.floors">
            Floor {{ floor.floor_number }}
            <ul>
              <li *ngFor="let unit of floor.units">
                Unit {{ unit.unit_number }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div *ngIf="!property">
        Loading property details...
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
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.apiService.getPropertyDetails(+propertyId).subscribe({
        next: (data) => this.property = data,
        error: (error) => console.error('Error fetching property details:', error)
      });
    }
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