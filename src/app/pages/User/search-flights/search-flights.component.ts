import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Importation des services et modèles
import { UserService } from '../../../services/user.service';
import { Flight} from '../../../models/models';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    FooterComponent
],
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent {
  searchForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      departure: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: [new Date(), Validators.required],
      passengers: [1, [Validators.required, Validators.min(1)]],
      class: ['economy', Validators.required]
    });
  }

  // recuperation de la liste de vol
  flights: Flight[] = [];


  ngOnInit(): void {
    this.userService.getFlights().subscribe((flightData: Flight[]) => {
      this.flights = flightData;
      console.log(this.flights);
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const formData = this.searchForm.value;
      console.log('Recherche de vols avec les données suivantes :', formData);
      // Ajoutez ici la logique pour effectuer la recherche avec formData
    } else {
      console.error('Le formulaire de recherche est invalide.');
    }
  }



}



