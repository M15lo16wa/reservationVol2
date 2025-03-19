import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// authentification
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule,
    CommonModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router:Router, private authService:AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      error: () => {
        this.errorMessage = 'Identifiants incorrects !';
      }
    });
  }
  }
