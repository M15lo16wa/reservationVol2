import { Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/Admin/dashboard/dashboard.component';
import { AirlinesComponent } from './pages/Admin/airlines/airlines.component';
import { BookingsComponent } from './pages/Admin/bookings/bookings.component';
import { UsersComponent } from './pages/Admin/users/users.component';
import { PassengersComponent } from './pages/Admin/passengers/passengers.component';
import { FlightsComponent } from './pages/Admin/flights/flights.component';
import { BookingComponent } from './pages/User/booking/booking.component';
import { AcceuilComponent } from './pages/User/acceuil/acceuil.component';
import { SearchFlightsComponent } from './pages/User/search-flights/search-flights.component';
import { FlightDetailsComponent } from './pages/User/flight-details/flight-details.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// page de connexion
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'admin/airlines', component: AirlinesComponent },
  { path: 'admin/flights', component: FlightsComponent },
  { path: 'admin/bookings', component: BookingsComponent },
  { path: 'admin/users', component: UsersComponent },
  {path:'user/search-flights', component:SearchFlightsComponent},
  { path: 'admin/passengers', component: PassengersComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'user/flight-details', component: FlightDetailsComponent },
  { path: 'user/booking', component: BookingComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'user/acceuil', component: AcceuilComponent },
  { path: 'login', component: LoginComponent}, //defintion de la route d'authentification
  { path: '', redirectTo: 'user/acceuil', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
