import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { BookingWithDetails, User, Flight } from '../models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseApiUrl = 'http://localhost:5000';
  private apiUrl1 = `${this.baseApiUrl}/reservations`;
  private apiUrl2 = `${this.baseApiUrl}/flights`;
  private apiUrl3 = `${this.baseApiUrl}/users`;
  private reservation = signal<BookingWithDetails[]>([])
  readonly reservation$ = this.reservation.asReadonly();


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getBookings():Observable<BookingWithDetails[]> {
    return this.http.get<BookingWithDetails[]>(this.apiUrl1, this.httpOptions)
      .pipe(
        tap((response: BookingWithDetails[]) => {
          this.reservation.set(response);
        }),
        catchError((error: any) => {
          console.error('Error fetching reservations:', error);
          return throwError(error);
        })
      );
  }

  getFlights():Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl2, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching flights:', error);
          return throwError(error);
        })
      );
  }

  // Récupération des utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<{ message: string; data: User[] }>(this.apiUrl3).pipe(
      map(response => response.data), // Extrait le tableau des utilisateurs depuis "data"
      tap((data) => console.log(`Users fetched (${data.length} items):`, data)),
      catchError((error) => {
        console.error('Error fetching Users:', error);
        return throwError(() => new Error('Unable to fetch Users'));
      })
    );
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl3}/${id}`, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting user:', error);
          return throwError(error);
        })
      );
  }

  deleteReservation(id_res: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl1}/${id_res}`, this.httpOptions).pipe(
      catchError((error: any) => {
        console.error('Erreur lors de l’annulation de la réservation:', error);
        return throwError(error);
      })
    );
  }

}
