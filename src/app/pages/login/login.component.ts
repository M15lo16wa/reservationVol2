import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// authentification
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService:AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      error: () => {
        this.errorMessage = 'Identifiants incorrects !';
      }
    });
  }

  gotToRegister(): void {
    this.router.navigate(['components/header']);
  }
  }
