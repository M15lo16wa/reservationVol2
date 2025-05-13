import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingWithDetails, Flight } from '../../models/models';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  booking: BookingWithDetails[] = [];
  Flight: Flight[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est connecté
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.userService.getReservations().subscribe({
      next: (data) => {
        this.booking = data;
        console.log('Bookings loaded:', this.booking);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.errorMessage = 'Erreur lors du chargement des réservations';
        this.isLoading = false;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  validerReservation(): void {
    // Logique de validation
  }

  annulerReservation() {
    // Réinitialiser le formulaire
    const form = document.querySelector('form');
    if (form) {
      form.reset();
    }
  }
}


