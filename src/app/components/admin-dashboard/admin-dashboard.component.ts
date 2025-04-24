import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { BookingWithDetails, Flight } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  bookings: BookingWithDetails[] = [];
  id_res: number = 0;
  filghts: Flight[] = [];


  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadBookings();
    this.loadFlights();

}

  loadBookings(): void {
    this.adminService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        console.log('Bookings loaded:', this.bookings);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
  }

  loadFlights(): void {
    this.adminService.getFlights().subscribe({
      next: (data) => {
        this.filghts = data;
        console.log('Flights loaded:', this.filghts);
      },
      error: (err) => {
        console.error('Error loading flights:', err);
      }
    });
  }

  annulerReservation(id_res: number): void {
    if(confirm('Êtes-vous sûr de vouloir annuler cette reservation ?')){
      this.adminService.deleteReservation(id_res).subscribe({
        next: () => {
          this.bookings = this.bookings.filter((res) => res.id_res !== id_res);
          console.log('Reservation annulée avec succès');
          alert('Reservation annulée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de l’annulation de la réservation:', err);
          alert('Erreur lors de l’annulation de la réservation');
        }
      });
    }
  }

}
