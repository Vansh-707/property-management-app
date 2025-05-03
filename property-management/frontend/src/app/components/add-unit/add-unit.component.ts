import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Property, Floor } from '../../models/interfaces';

@Component({
  selector: 'app-add-unit',
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h2>Add New Unit</h2>
        </div>
        <div class="card-body">
          <form [formGroup]="unitForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">Select Property</label>
              <select class="form-select" formControlName="propertyId" (change)="onPropertySelect()">
                <option value="">Select a property</option>
                <option *ngFor="let property of properties" [value]="property.id">
                  {{property.name}}
                </option>
              </select>
              <div *ngIf="unitForm.get('propertyId')?.touched && unitForm.get('propertyId')?.invalid" 
                   class="text-danger">
                Property is required
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Select Floor</label>
              <select class="form-select" formControlName="floorId">
                <option value="">Select a floor</option>
                <option *ngFor="let floor of floors" [value]="floor.id">
                  Floor {{floor.floor_number}}
                </option>
              </select>
              <div *ngIf="unitForm.get('floorId')?.touched && unitForm.get('floorId')?.invalid" 
                   class="text-danger">
                Floor is required
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Unit Number</label>
              <input type="text" class="form-control" formControlName="unitNumber">
              <div *ngIf="unitForm.get('unitNumber')?.touched && unitForm.get('unitNumber')?.invalid" 
                   class="text-danger">
                Unit number is required
              </div>
            </div>

            <button type="submit" 
                    class="btn btn-primary"
                    [disabled]="unitForm.invalid || isLoading">
              {{isLoading ? 'Adding...' : 'Add Unit'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class AddUnitComponent implements OnInit {
  unitForm: FormGroup;
  properties: Property[] = [];
  floors: Floor[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.unitForm = this.fb.group({
      propertyId: ['', Validators.required],
      floorId: ['', Validators.required],
      unitNumber: ['', [Validators.required, Validators.minLength(1)]]
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

  onPropertySelect() {
    const propertyId = this.unitForm.get('propertyId')?.value;
    if (propertyId) {
      this.apiService.getPropertyDetails(propertyId).subscribe({
        next: (data) => {
          this.floors = data.floors || [];
          this.unitForm.patchValue({ floorId: '' });
        },
        error: (error) => console.error('Error:', error)
      });
    } else {
      this.floors = [];
      this.unitForm.patchValue({ floorId: '' });
    }
  }

  onSubmit() {
    if (this.unitForm.valid) {
      this.isLoading = true;
      const { floorId, unitNumber } = this.unitForm.value;
      this.apiService.createUnit({ floorId, unitNumber }).subscribe({
        next: () => {
          this.unitForm.reset();
          this.isLoading = false;
          this.router.navigate(['/properties', this.unitForm.value.propertyId]);
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }
}