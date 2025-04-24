import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// Interface pour typer la réponse d'authentification
interface AuthResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'Authorization', })
    };

  private apiUrl = 'http://localhost:5000/auth'; // URL de l'API pour la connexion
  errorMessage: any;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Méthode pour se connecter avec email et mot de passe
   * Stocke le token et le rôle, puis redirige selon le rôle
   */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (!response || !response.token || !response.role) {
          throw new Error('Réponse API invalide');
        }

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        // Redirection selon le rôle
        if (response.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/components/user-profile']);
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la connexion:', error);
        return throwError(() => new Error('Erreur lors de la connexion. Veuillez vérifier vos identifiants.'));
      })
    );
  }

  /**
   * Méthode pour se déconnecter
   * Supprime les données d'authentification et redirige vers la page login
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  /**
   * Vérifie si l'utilisateur est authentifié (token présent)
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Alias pour isAuthenticated (évite la confusion)
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  /**
   * Méthode non implémentée pour récupérer les réservations
   */
  getBookings() {
    throw new Error('Method not implemented.');
  }
}
