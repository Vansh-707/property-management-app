import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { AddFloorComponent } from './components/add-floor/add-floor.component';
import { AddUnitComponent } from './components/add-unit/add-unit.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { AvailableUnitsComponent } from './components/available-units/available-units.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginDialogComponent },
  { path: 'properties/add', component: AddPropertyComponent },
  { path: 'properties/:id', component: PropertyDetailsComponent },
  { path: 'properties/:id/details', component: PropertyDetailsComponent },
  { path: 'floors/add', component: AddFloorComponent },
  { path: 'units/add', component: AddUnitComponent },
  { path: 'units/available', component: AvailableUnitsComponent },
  { path: 'history', component: BookingHistoryComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }