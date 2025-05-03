import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-dialog',
  template: `
    <div class="modal" tabindex="-1" [style.display]="visible ? 'block' : 'none'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login Required</h5>
            <button type="button" class="btn-close" (click)="cancel()"></button>
          </div>
          <div class="modal-body">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label">User ID</label>
                <input type="text" class="form-control" formControlName="userId">
                <div *ngIf="loginForm.get('userId')?.touched && loginForm.get('userId')?.invalid" 
                     class="text-danger">
                  User ID is required
                </div>
              </div>
              <button type="submit" 
                      class="btn btn-primary"
                      [disabled]="loginForm.invalid || isLoading">
                {{isLoading ? 'Logging in...' : 'Login'}}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show" *ngIf="visible"></div>
  `
})
export class LoginDialogComponent {
  loginForm: FormGroup;
  visible = false;
  isLoading = false;
  private resolveRef: ((value: boolean) => void) | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required]
    });
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
      this.authService.login(this.loginForm.value.userId).subscribe({
        next: () => {
          this.isLoading = false;
          this.visible = false;
          this.resolveRef?.(true);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
        }
      });
    }
  }

  cancel() {
    this.visible = false;
    this.resolveRef?.(false);
  }
}