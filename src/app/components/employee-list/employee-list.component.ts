import { Component, OnInit,HostListener } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { ConfirmDialogComponent } from '../confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';



@Component({
  selector: 'app-employee-list',
  standalone:true,
  imports: [CommonModule,MatButtonModule, MatCardModule, MatIconModule, MatDialogModule, MatToolbar,MatFormField,MatInputModule,FormsModule,MatTooltip],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent  {
 employees:Employee[] = [];
 dataSource = new MatTableDataSource<Employee>();
 searchText: string = '';
 showSearch: boolean = false;

  constructor(
    private employeeservice:EmployeeService,
    public router:Router,
    private dialog: MatDialog
  ){}

 

  ngOnInit():void{
   this.loadEmployees();
   this.setupFilter();
  }

  goBack(): void {
    this.router.navigate(['/welcome']);
  }

  loadEmployees(){
    this.employees= this.employeeservice?.getAllEmployees();
    this.dataSource.data = this.employees;
  }

  viewEmployee(id:number):void{
     this.router.navigate(['/view',id], { replaceUrl: true });
  }

  editEmployee(id:number):void{
    this.router.navigate(['/edit',id], { replaceUrl: true });
  }

  deleteEmployee(employeeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height:'200px',  

    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.employeeservice.deleteEmployee(employeeId);
        this.employees = this.employeeservice.getAllEmployees();  
        this.loadEmployees();
      }
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
  setupFilter() {
    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const nameMatch = data.name.toLowerCase().includes(filter);
      const emailMatch = data.email.toLowerCase().includes(filter);
      const companyMatch = data.company.toLowerCase().includes(filter);
  
      return nameMatch || emailMatch || companyMatch;
    };
  }
  
  filteredEmployees() {
    this.dataSource.filter = this.searchText.trim().toLowerCase(); 
  }
}
