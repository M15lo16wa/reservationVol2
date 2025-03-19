import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// footer
import { FooterComponent } from '../../../components/footer/footer.component';


@Component({
  selector: 'app-search-flights',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    FooterComponent],
  templateUrl: './search-flights.component.html',
  styleUrl: './search-flights.component.css'
})
export class SearchFlightsComponent {
  searchForm: FormGroup;
flights: any;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      departure: [''],
      destination: [''],
      date: [new Date()],
      passengers: [1],
      class: ['economy']
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      // Ici nous ajouterons la logique de recherche
    }
  }

}
