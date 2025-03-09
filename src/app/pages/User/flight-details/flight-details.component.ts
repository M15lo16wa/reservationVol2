import { Component } from '@angular/core';
import { Location, CommonModule } from '@angular/common';
@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent {
  destination: any;

  constructor(private location: Location) {
    const navigation = window.history.state;
    if (navigation && navigation.destination) {
      this.destination = navigation.destination;
    } else {
      this.destination = { name: 'Inconnu', description: 'Aucune information disponible' };
    }
  }

  goBack() {
    this.location.back();
  }
}
