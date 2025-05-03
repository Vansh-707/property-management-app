import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { AddFloorComponent } from './components/add-floor/add-floor.component';
import { AddUnitComponent } from './components/add-unit/add-unit.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { AvailableUnitsComponent } from './components/available-units/available-units.component';

const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties/add', component: AddPropertyComponent },
  { path: 'properties/:id', component: PropertyDetailsComponent },
  { path: 'floors/add', component: AddFloorComponent },
  { path: 'units/add', component: AddUnitComponent },
  { path: 'units/available', component: AvailableUnitsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }