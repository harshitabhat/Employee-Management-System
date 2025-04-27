
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-employee-details',
  standalone:true,
  imports: [MatCardModule,MatButtonModule,CommonModule,MatDividerModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employee = this.employeeService.getEmployeeById(+id);
    }
  }

}
