import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Login</h5>
        </div>
        <div class="card-body">
          <form *ngIf="!successMessage" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
              <label class="form-label">User ID</label>
              <input type="text" class="form-control" formControlName="userId">
              <div *ngIf="loginForm.get('userId')?.touched && loginForm.get('userId')?.invalid" 
                   class="text-danger">
                User ID is required
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" formControlName="password">
              <div *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid" 
                   class="text-danger">
                Password is required
              </div>
            </div>
            <button type="submit" 
                    class="btn btn-primary"
                    [disabled]="loginForm.invalid || isLoading">
              {{isLoading ? 'Logging in...' : 'Login'}}
            </button>
          </form>
          <div class="mt-3">
            <a routerLink="/register">Register</a>
          </div>
          <div *ngIf="errorMessage" class="alert alert-danger mt-3">
            {{ errorMessage }}
          </div>
          <div *ngIf="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginDialogComponent {
  loginForm: FormGroup;
  visible = false;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  private resolveRef: ((value: boolean) => void) | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/units/available']); // Redirect to available units if already logged in
    }
  }

  show(): Promise<boolean> {
    this.visible = true;
    return new Promise(resolve => {
      this.resolveRef = resolve;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { userId, password } = this.loginForm.value;
      this.authService.login(userId, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Login successful!';
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/units/available']); // Navigate to the default page after login
          }, 2000); // Delay navigation to show the success message
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.successMessage = null;
          if (error.status === 404) {
            this.errorMessage = 'no user found';
          } else if (error.status === 401) {
            this.errorMessage = 'incorrect login';
          } else {
            this.errorMessage = 'An unexpected error occurred';
          }
        }
      });
    }
  }

  cancel() {
    this.visible = false;
    this.resolveRef?.(false);
  }
}