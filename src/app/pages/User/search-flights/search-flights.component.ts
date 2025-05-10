import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../components/footer/footer.component";
import { UserService } from '../../../services/user.service';
import { Flight } from '../../../models/models';

type FlightClass = 'economy' | 'business' | 'first';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FooterComponent
  ]
})
export class SearchFlightsComponent implements OnInit {
  public searchForm!: FormGroup;
  public departureCities: string[] = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice'];
  public destinationCities: string[] = ['New York', 'London', 'Tokyo', 'Dubai', 'Rome'];
  public flights: Flight[] = [];

  public readonly classIcons: Record<FlightClass, string> = {
    economy: 'airline_seat_recline_normal',
    business: 'airline_seat_individual_suite',
    first: 'airline_seat_flat'
  };

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      departure: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      passengers: [1, [Validators.required, Validators.min(1)]],
      class: ['economy' as FlightClass, Validators.required]
    });
  }

  public ngOnInit(): void {
    this.loadFlights();
  }

  public loadFlights(): void {
    this.userService.getFlights().subscribe({
      next: (flightData: Flight[]) => {
        this.flights = flightData;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des vols:', error);
      }
    });
  }

  public onSearch(): void {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      console.log('Recherche de vols avec les données suivantes :', formData);
    }
  }

  public filterFlights(event: any): void {
    const status = event.value;
    if (status === 'all') {
      this.loadFlights();
    } else {
      this.flights = this.flights.filter(flight =>
        flight.statut.toLowerCase() === status.toLowerCase()
      );
    }
  }

  public getClassLabel(classValue: string): string {
    const labels: Record<FlightClass, string> = {
      economy: 'Économique',
      business: 'Business',
      first: 'Première classe'
    };
    return labels[classValue as FlightClass] || 'Économique';
  }
}



