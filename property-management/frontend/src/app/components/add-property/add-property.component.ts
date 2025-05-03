import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h2>Add New Property</h2>
        </div>
        <div class="card-body">
          <form [formGroup]="propertyForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" formControlName="name">
              <div *ngIf="propertyForm.get('name')?.touched && propertyForm.get('name')?.invalid" class="text-danger">
                <div *ngIf="propertyForm.get('name')?.errors?.['required']">Name is required</div>
                <div *ngIf="propertyForm.get('name')?.errors?.['pattern']">Name can only contain letters, numbers, and spaces (max 255 characters)</div>
              </div>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Address</label>
              <input type="text" class="form-control" formControlName="address">
              <div *ngIf="propertyForm.get('address')?.touched && propertyForm.get('address')?.invalid" class="text-danger">
                <div *ngIf="propertyForm.get('address')?.errors?.['required']">Address is required</div>
                <div *ngIf="propertyForm.get('address')?.errors?.['pattern']">Address can only contain letters, numbers, commas, and spaces</div>
              </div>
            </div>

            <button type="submit" 
                    class="btn btn-primary"
                    [disabled]="propertyForm.invalid || isLoading">
              {{isLoading ? 'Adding...' : 'Add Property'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AddPropertyComponent {
  propertyForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.propertyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]{1,255}$/)]], // Alphanumeric and spaces, max 255 chars
      address: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9, ]+$/)]] // Alphanumeric, commas, and spaces
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      this.isLoading = true;
      this.apiService.createProperty(this.propertyForm.value).subscribe({
        next: () => {
          this.propertyForm.reset();
          this.isLoading = false;
          this.router.navigate(['/units/available']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }
}