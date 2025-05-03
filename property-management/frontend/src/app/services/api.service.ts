import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property, Floor, Unit } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Properties
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}/properties`);
  }

  createProperty(property: Partial<Property>): Observable<Property> {
    return this.http.post<Property>(`${this.baseUrl}/properties`, property);
  }

  getPropertyDetails(propertyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/properties/${propertyId}/details`);
  }

  // Floors
  createFloor(floor: { propertyId: number, floorNumber: number }): Observable<Floor> {
    return this.http.post<Floor>(`${this.baseUrl}/floors`, floor);
  }

  // Units
  createUnit(unit: { floorId: number, unitNumber: string }): Observable<Unit> {
    return this.http.post<Unit>(`${this.baseUrl}/units`, unit);
  }

  getAvailableUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.baseUrl}/units/available`);
  }

  bookUnit(unitId: number): Observable<Unit> {
    return this.http.put<Unit>(`${this.baseUrl}/units/${unitId}/book`, {});
  }

  getBookingHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/units/history`);
  }

  register(userId: string, password: string): Observable<any> {
    const user = { username: userId, password };
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }
}