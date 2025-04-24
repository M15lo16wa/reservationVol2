import { Component, OnInit } from '@angular/core';
import { AdminDashboardComponent } from "../../../components/admin-dashboard/admin-dashboard.component";

import { AirlinesComponent } from '../airlines/airlines.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AirlinesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {}
}
