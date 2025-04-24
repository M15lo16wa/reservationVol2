import { Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//importation du guard
import { AuthGuard } from './auth.guard';
//
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
// page de connexion
import { LoginComponent } from './pages/login/login.component';
// components
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
export const routes: Routes = [
  // lien des pages components
  {path:'components/booking', component:BookingComponent},
  {path: 'components/admin-dashboard', component: AdminDashboardComponent},
  {path:'components/header', component:HeaderComponent},
  {path:'components/user-profile', component: UserProfileComponent},

  // lien de la page administrateur
  // {path:'admin/dashboard',component:DashboardComponent,
  //   canActivate: [AuthGuard],
  //   children:[
  //     {
  //       path:'airlines',
  //       component: AirlinesComponent,
  //     },
  //     {
  //       path:'flights',
  //       component: FlightsComponent,
  //     },
  //     {
  //       path:'bookings',
  //       component: BookingsComponent,
  //     }
  //   ]
  // },

  { path: 'admin/airlines', component: AirlinesComponent },
  { path: 'admin/flights', component: FlightsComponent },
  { path: 'admin/bookings', component: BookingsComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/passengers', component: PassengersComponent },
  { path: 'admin/dashboard', component: DashboardComponent },

  // lien de la page utilisateur
  {path:'user/search-flights', component:SearchFlightsComponent},
  { path: 'user/flight-details', component: FlightDetailsComponent },
  { path: 'user/booking', component: BookingComponent },
  { path: 'user/acceuil', component: AcceuilComponent },

  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: 'user/acceuil', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
