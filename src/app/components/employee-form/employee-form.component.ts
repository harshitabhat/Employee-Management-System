import { Component, OnInit, inject,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { MessageSnackbarComponent } from '../../shared/message-snackbar/message-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';



@Component({
  selector: 'app-employee-form',
  standalone: true,
  templateUrl: './employee-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private employeeService = inject(EmployeeService);
  private snackBar = inject(MatSnackBar);
 

  ngOnInit(): void {
 
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      designation: ['', Validators.required],
      gender : ['', Validators.required]
    });
    
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.employeeId = +idParam;
      const existingEmp = this.employeeService.getEmployeeById(this.employeeId);
      if (existingEmp) {
        this.employeeForm.patchValue(existingEmp);
        Object.keys(this.employeeForm.controls).forEach(field => {
          const control = this.employeeForm.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      } else {
        alert('Employee not found!');
        this.router.navigate(['/employees']);
      }
    }
  }


  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.snackBar.openFromComponent(MessageSnackbarComponent, {
        data: { message: 'Please fill all required fields!' },
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'error-snackbar'
      });
      return;
    }
  
    const empData: Employee = {
      id: this.isEditMode ? this.employeeId : Date.now(),
      ...this.employeeForm.value,
      avatar: this.isEditMode
        ? this.employeeService.getEmployeeById(this.employeeId)?.avatar || ''
        : this.employeeService.getRandomAvatar(this.employeeForm.value.gender)
    };
  
    if (this.isEditMode) {
      if (this.employeeForm.dirty) {
        this.employeeService.updateEmployee(empData);
        this.snackBar.openFromComponent(MessageSnackbarComponent, {
          data: { message: 'Employee details updated successfully!' },
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'success-snackbar'
        });
      } else {
        this.snackBar.openFromComponent(MessageSnackbarComponent, {
          data: { message: 'No changes detected. Employee details were not updated.' },
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'error-snackbar'
        });
      }
    } else {
      this.employeeService.addEmployee(empData);
      this.snackBar.openFromComponent(MessageSnackbarComponent, {
        data: { message: 'Employee added successfully!' },
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'success-snackbar'
      });
    }
  
    this.router.navigate(['/employees']);
  }
  
}
