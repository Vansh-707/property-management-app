import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Property } from '../../models/interfaces';

@Component({
  selector: 'app-add-floor',
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h2>Add New Floor</h2>
        </div>
        <div class="card-body">
          <form [formGroup]="floorForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Select Property</label>
              <select class="form-select" formControlName="propertyId">
                <option value="">Select a property</option>
                <option *ngFor="let property of properties" [value]="property.id">
                  {{property.name}}
                </option>
              </select>
              <div *ngIf="floorForm.get('propertyId')?.touched && floorForm.get('propertyId')?.invalid" 
                   class="text-danger">
                Property is required
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Floor Number</label>
              <input type="number" class="form-control" formControlName="floorNumber" min="0">
              <div *ngIf="floorForm.get('floorNumber')?.touched && floorForm.get('floorNumber')?.invalid" class="text-danger">
                <div *ngIf="floorForm.get('floorNumber')?.errors?.['required']">Floor number is required</div>
                <div *ngIf="floorForm.get('floorNumber')?.errors?.['pattern']">Floor number must be a positive integer</div>
              </div>
            </div>

            <button type="submit" 
                    class="btn btn-primary"
                    [disabled]="floorForm.invalid || isLoading">
              {{isLoading ? 'Adding...' : 'Add Floor'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AddFloorComponent implements OnInit {
  floorForm: FormGroup;
  properties: Property[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.floorForm = this.fb.group({
      propertyId: ['', Validators.required],
      floorNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]] // Only positive integers
    });
  }

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.apiService.getProperties().subscribe({
      next: (data) => this.properties = data,
      error: (error) => console.error('Error:', error)
    });
  }

  onSubmit() {
    if (this.floorForm.valid) {
      this.isLoading = true;
      console.log('Form Value:', this.floorForm.value); // Log the form value for debugging
      const propertyId = this.floorForm.value.propertyId;
      if (!propertyId) {
        console.error('Property ID is required but not provided.');
        this.isLoading = false;
        return;
      }
      this.apiService.createFloor(this.floorForm.value).subscribe({
        next: () => {
          this.floorForm.reset();
          this.isLoading = false;
          this.router.navigate(['/properties', propertyId]);
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }
}