import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      company: 'TechCorp',
      email: 'rahul@techcorp.com',
      contact: '9876543210',
      designation: 'Software Engineer',
      avatar: this.getRandomAvatar()
    },
    {
      id: 2,
      name: 'Priya Mehra',
      company: 'InnovateX',
      email: 'priya@innovatex.com',
      contact: '9123456780',
      designation: 'Project Manager',
      avatar: this.getRandomAvatar()
    }
  ];



  constructor() { 
    const data = localStorage.getItem('employees');
    if (data) {
      this.employees = JSON.parse(data);
    }
  }

  getAllEmployees(): Employee[] {
    return this.employees;
  } 

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Employee) {
    employee.id = this.generateNewId();
    employee.avatar = this.getRandomAvatar();
    this.employees.push(employee);
    this.saveToLocalStorage();
  }

  updateEmployee(updatedEmp: Employee) {
    const index = this.employees.findIndex(emp => emp.id === updatedEmp.id);
    if (index !== -1) {
      this.employees[index] = updatedEmp;
      this.saveToLocalStorage();
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
    this.saveToLocalStorage();
  }

  private generateNewId(): number {
    return this.employees.length > 0
      ? Math.max(...this.employees.map(emp => emp.id)) + 1
      : 1;
  }

  public getRandomAvatar(): string {
    const id = Math.floor(Math.random() * 90) + 10;
    return `https://randomuser.me/api/portraits/men/${id}.jpg`;
  }

  private saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }
}
