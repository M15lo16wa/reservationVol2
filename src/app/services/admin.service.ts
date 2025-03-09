import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airline, Flight, Booking, User, Passenger } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = ''; // API REST

  constructor(private http: HttpClient) {}

  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(`${this.apiUrl}/airlines`);
  }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/flights`);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(`${this.apiUrl}/passengers`);
  }
}
