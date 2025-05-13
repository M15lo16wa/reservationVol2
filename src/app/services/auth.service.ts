import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap, finalize } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  utilisateur: {
    role: string;
    id: number;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }),
    withCredentials: true
  };

  private apiUrl = 'http://localhost:8000';
  private csrfUrl = `${this.apiUrl}/sanctum/csrf-cookie`;
  private loginApiUrl = `${this.apiUrl}/api/login`;
  private logoutApiUrl = `${this.apiUrl}/api/logout`;
  private registerApiUrl = `${this.apiUrl}/api/register`;

  constructor(private http: HttpClient, private router: Router) { }

  // Connexion unifiée pour utilisateurs et agents
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.get(this.csrfUrl, { withCredentials: true }).pipe(
      switchMap(() => {
        return this.http.post<AuthResponse>(this.loginApiUrl, { email, password }, this.httpOptions).pipe(
          tap(response => {
            console.log('Réponse login:', response);
            this.handleLogin(response);
          }),
          catchError(error => {
            console.error('Erreur login:', error);
            if (error.status === 401) {
              return throwError(() => new Error('Identifiants invalides'));
            }
            return throwError(() => new Error(error.error?.message || 'Erreur lors de la connexion'));
          })
        );
      })
    );
  }

  register(userData: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    adresse: string;
    telephone: string;
  }): Observable<any> {
    return this.http.get(this.csrfUrl, { withCredentials: true }).pipe(
      switchMap(() =>
        this.http.post(this.registerApiUrl, userData, this.httpOptions).pipe(
          tap(() => this.router.navigate(['/login'])),
          catchError(error => {
            console.error("Erreur lors de l'enregistrement:", error);
            return throwError(() => new Error("Erreur lors de l'enregistrement."));
          })
        )
      )
    );
  }

  // Gestion de la réponse de connexion
  private handleLogin(response: AuthResponse): void {
    console.log('Réponse complète:', response);

    if (!response.token) {
      console.error('Token manquant dans la réponse');
      throw new Error('Token manquant dans la réponse');
    }

    if (!response.utilisateur) {
      console.error('Données utilisateur manquantes dans la réponse');
      throw new Error('Données utilisateur manquantes');
    }

    // Stockage des informations d'authentification
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.utilisateur.role || 'user');

    // Stockage optionnel des informations supplémentaires si elles existent
    if (response.utilisateur.id) {
      localStorage.setItem('userId', response.utilisateur.id.toString());
    }
    if (response.utilisateur.email) {
      localStorage.setItem('userEmail', response.utilisateur.email);
    }

    // Redirection selon le rôle
    const role = response.utilisateur.role || 'user';
    console.log('Redirection avec le rôle:', role);

    if (role === 'agent') {
      this.router.navigate(['/admin/dashboard']);
    } else if (role === 'user') {
      this.router.navigate(['/components/user-profile']);
    } else {
      throw new Error('Rôle non reconnu');
    }
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse, defaultMessage: string) {
    console.error("Erreur d'authentification:", error);

    if (error.status === 401) {
      return throwError(() => new Error('Identifiants invalides'));
    } else if (error.status === 0) {
      return throwError(() => new Error('Impossible de se connecter au serveur'));
    }

    return throwError(() => new Error(error.error?.message || defaultMessage));
  }

  // Déconnexion
  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${token}`
    });

    // Nettoyage du localStorage avant la requête de déconnexion
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');

    return this.http.post(this.logoutApiUrl, {}, { headers, withCredentials: true }).pipe(
      tap(() => {
        console.log('Déconnexion réussie');
      }),
      catchError(error => {
        console.error('Erreur lors de la déconnexion:', error);
        return throwError(() => new Error('Erreur lors de la déconnexion'));
      }),
      finalize(() => {
        // Redirection après que tout soit terminé
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 100);
      })
    );
  }

  // Vérification de l'authentification
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Récupération du rôle
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Vérification du rôle
  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  // Vérification si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // Récupération du token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Récupération de l'ID utilisateur
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  getBookings() {
    throw new Error('Method not implemented.');
  }
}
