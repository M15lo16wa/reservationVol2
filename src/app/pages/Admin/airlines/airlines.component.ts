import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Import du Router

@Component({
  selector: 'app-airlines',
  standalone: true,
  imports: [],
  templateUrl: './airlines.component.html',
  styleUrl: './airlines.component.css'
})
export class AirlinesComponent {

  constructor(private router: Router) {} // Injection du Router

  redirectToAdminDashboard() {
    this.router.navigate(['components/admin-dashboard']); // Redirection vers admin-dashboard
  }
  redirectToUtilisateur() {
    this.router.navigate(['admin/bookings']);
  }
}
