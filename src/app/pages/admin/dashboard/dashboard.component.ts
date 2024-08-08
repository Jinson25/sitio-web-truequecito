import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit {
  userCount: number = 0;
  productCount: number = 0;
  roleCount: number = 0;
  exchangeCount: number = 0;

  constructor(private dashboardService: AdminService) {}

  ngOnInit(): void {
    this.dashboardService.getUserCount().subscribe(data => this.userCount = data.count);
    this.dashboardService.getProductCount().subscribe(data => this.productCount = data.count);
    this.dashboardService.getRoleCount().subscribe(data => this.roleCount = data.count);
    this.dashboardService.getExchangeCount().subscribe(data => this.exchangeCount = data.count);
  }
}
