import { Routes } from '@angular/router';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeFormComponent } from './components/employeeform/employee-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'registeremployee', component: EmployeeFormComponent },
  { path: 'editemployee/:id', component: EmployeeEditComponent },
];