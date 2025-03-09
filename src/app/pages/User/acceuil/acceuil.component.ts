import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// import { HeaderComponent } from '../../components/header/header.component'; //importation de l'en-tête dans la page d'acceuille

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {
  constructor(private router: Router){}
  goToLogin(): void{
    this.router.navigate(['/login']);
}
  goToResevation(): void{
    this.router.navigate(['/user/booking']);
  }

  goToDestination(): void{
    this.router.navigate(['/user/search-flights']);
  }

}
