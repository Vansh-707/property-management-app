import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddPropertyComponent } from './components/add-property/add-property.component';
import { AddFloorComponent } from './components/add-floor/add-floor.component';
import { AddUnitComponent } from './components/add-unit/add-unit.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { AvailableUnitsComponent } from './components/available-units/available-units.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    AddFloorComponent,
    AddUnitComponent,
    PropertyDetailsComponent,
    AvailableUnitsComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

