import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div class="container">
        <a class="navbar-brand" href="#">Property Management</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/properties/add" routerLinkActive="active">Add Property</a>
          <a class="nav-link" routerLink="/floors/add" routerLinkActive="active">Add Floor</a>
          <a class="nav-link" routerLink="/units/add" routerLinkActive="active">Add Unit</a>
          <a class="nav-link" routerLink="/units/available" routerLinkActive="active">Available Units</a>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}