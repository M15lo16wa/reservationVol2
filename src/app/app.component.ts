import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
// import { AcceuilComponent } from './pages/acceuil/acceuil.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule
    // AcceuilComponent //importation de la page d'acceuil
  ],//importation de la page d'acceuil
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'mon vol de reservation';
  // constructor(private router: Router){}
  // goToLogin(): void{
  //   this.router.navigate(['/login']);
  // }

}
