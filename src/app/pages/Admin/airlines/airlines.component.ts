import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { AuthService } from '../../../services/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-airlines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airlines.component.html',
  styleUrl: './airlines.component.css'
})
export class AirlinesComponent implements OnInit, AfterViewInit {
  stats = {
    reservations: 1521,
    billets: 32211,
    passagersParVol: 122,
    revenus: 1250000,
    volsActifs: 45
  };

  private statsChart: Chart | null = null;
  private flightsChart: Chart | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // Initialisation des données
  }

  ngAfterViewInit() {
    this.initializeCharts();
  }

  private initializeCharts() {
    this.initializeStatsChart();
    this.initializeFlightsChart();
  }

  private initializeStatsChart() {
    const ctx = document.getElementById('statsChart') as HTMLCanvasElement;
    if (ctx) {
      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
          datasets: [{
            label: 'Réservations',
            data: [1200, 1900, 1500, 2100, 1800, 1521],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Évolution des réservations'
            }
          }
        }
      };

      this.statsChart = new Chart(ctx, config);
    }
  }

  private initializeFlightsChart() {
    const ctx = document.getElementById('flightsChart') as HTMLCanvasElement;
    if (ctx) {
      const config: ChartConfiguration = {
        type: 'doughnut',
        data: {
          labels: ['Vols intérieurs', 'Vols internationaux', 'Vols charters'],
          datasets: [{
            data: [45, 30, 25],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Répartition des vols'
            }
          }
        }
      };

      this.flightsChart = new Chart(ctx, config);
    }
  }

  redirectToAdminDashboard() {
    this.router.navigate(['/admin/dashboard']);
  }

  redirectToUtilisateur() {
    this.router.navigate(['/admin/bookings']);
  }

  redirectToRapports() {
    this.router.navigate(['/admin/reports']);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    });
  }

  ngOnDestroy() {
    // Nettoyage des graphiques
    if (this.statsChart) {
      this.statsChart.destroy();
    }
    if (this.flightsChart) {
      this.flightsChart.destroy();
    }
  }
}
