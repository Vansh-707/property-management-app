import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Register</h5>
        </div>
        <div class="card-body">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">User ID</label>
              <input type="text" class="form-control" formControlName="userId">
              <div *ngIf="registerForm.get('userId')?.touched && registerForm.get('userId')?.invalid" 
                   class="text-danger">
                User ID is required
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" formControlName="password">
              <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" 
                   class="text-danger">
                Password is required
              </div>
            </div>
            <button type="submit" 
                    class="btn btn-primary"
                    [disabled]="registerForm.invalid || isLoading">
              {{isLoading ? 'Registering...' : 'Register'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.apiService.register(this.registerForm.value.userId, this.registerForm.value.password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }
}