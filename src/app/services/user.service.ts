import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { BookingWithDetails, Flight } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // recuperation de l'url de l'api
  private baseApiUrl = 'http://localhost:5000';
  private apiUrl = `${this.baseApiUrl}/flights`;
  private apiUrlReservation = `${this.baseApiUrl}/reservations/init`;
  private apiUrlConfirm = `${this.baseApiUrl}/reservations/confirm/:id`;

  constructor(private http: HttpClient) {}

  getFlights(page: number = 1, limit: number = 10): Observable<Flight[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Flight[]>(this.apiUrl, { params }).pipe(
      tap((data) => console.log(`Fetched ${data.length} flights`)),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  // recuperation de la liste de vol par id
  getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // creation de reservation
  createReservation(reservation: BookingWithDetails): Observable<any> {
    return this.http.post(`${this.apiUrlReservation}`, reservation).pipe(
      tap((response) => console.log('Reservation created:', response)),
      catchError(this.handleError)
    )
  }

  // confirmation de reservation
  confirmReservation(id: string): Observable<any> {
    return this.http.post(`${this.apiUrlConfirm.replace(':id', id)}`, {}).pipe(
      tap((response) => console.log('Reservation confirmed:', response)),
      catchError(this.handleError)
    )
  }
  // recuperation de la liste de reservation
  getReservations(): Observable<BookingWithDetails[]> {
    return this.http.get<BookingWithDetails[]>(this.apiUrlReservation).pipe(
      tap((data) => console.log(`Fetched ${data.length} reservations`)),
      shareReplay(1),
      catchError(this.handleError)
    );
  }
  // gestion des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error?.message || 'Unknown server error';
    console.error(`API Error: ${error.status} - ${errorMessage}`);
    return throwError(() => new Error(errorMessage));
  }
}

