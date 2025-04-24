import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingWithDetails, Flight } from '../../models/models';

import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  booking: BookingWithDetails[] = [];
  Flight: Flight[]=[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.userService.getReservations().subscribe({
      next: (data) => {
        this.booking = data;
        console.log('Bookings loaded:', this.booking);
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
  }

  validerReservation():void {}
}


