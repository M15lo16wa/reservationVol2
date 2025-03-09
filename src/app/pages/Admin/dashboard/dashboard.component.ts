import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalFlights = 0;
  totalBookings = 0;
  totalUsers = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getFlights().subscribe(data => this.totalFlights = data.length);
    this.adminService.getBookings().subscribe(data => this.totalBookings = data.length);
    this.adminService.getUsers().subscribe(data => this.totalUsers = data.length);
  }
}
