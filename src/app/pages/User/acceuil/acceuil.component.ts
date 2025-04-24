import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// importation de service d'authentification
import { AuthService } from '../../../services/auth.service';

// import { HeaderComponent } from '../../components/header/header.component'; //importation de l'en-tête dans la page d'acceuille

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent {
  constructor(private router: Router, private authService: AuthService) { }
  goToLogin(): void{
    this.router.navigate(['/login']);
}
goToReservation(): void {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/components/user-profile']);
  } else {
    this.router.navigate(['/login']);
  }
}


  goToDestination(): void{
    this.router.navigate(['/user/search-flights']);
  }
}
