import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  destinations = [
      { name: 'Paris', description: 'Ville lumière et capitale de la France' },
      { name: 'New York', description: 'La ville qui ne dort jamais' },
      { name: 'Tokyo', description: 'Mélange parfait entre tradition et modernité' }
    ];

    filteredDestinations = [...this.destinations]; // Liste filtrée

    constructor(private router: Router) {}

    // Filtrer les destinations selon la recherche
    onSearch(event: any) {
      const query = event.target.value.toLowerCase();
      this.filteredDestinations = this.destinations.filter(dest =>
        dest.name.toLowerCase().includes(query)
      );
    }

    // Naviguer vers la page des détails
    viewDetails(destination: any) {
      this.router.navigate(['/flight-details'], { state: { destination } });
    }

}
