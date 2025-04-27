
import { RouterOutlet } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'employee-management';

  constructor(private router: Router, private employeeService: EmployeeService) {}
   ngOnInit(): void {
    if (window.location.pathname === '/employees') {
      this.router.navigate(['/welcome']);
    } else if (window.location.pathname === '/view/:id' || '/edit/:id' || 'add'){
      this.router.navigate(['/employees']);
    }
  }
}



