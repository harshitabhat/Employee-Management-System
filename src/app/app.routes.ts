import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';



export const appRoutes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' }, 
    { path: 'welcome', component: WelcomeComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'add', component: EmployeeFormComponent },
    { path: 'edit/:id', component: EmployeeFormComponent },
    { path: 'view/:id', component: EmployeeDetailsComponent },

];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }

