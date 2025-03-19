import { Component } from '@angular/core';
import { BookingComponent } from "../../../components/booking/booking.component";

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [BookingComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

}
