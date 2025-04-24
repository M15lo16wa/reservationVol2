import { Component, OnInit } from '@angular/core'; // <-- Ajoute OnInit ici
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/models';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit { // <-- Implémente OnInit
  users: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users loaded:', this.users);
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.adminService.deleteUser(id).subscribe(() => {
        alert('Utilisateur supprimé avec succès');
        this.loadUsers();
      });
    }
  }
}
