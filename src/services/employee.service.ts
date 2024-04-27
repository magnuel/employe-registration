import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = []; // Aquí se almacenan los empleados

  constructor() {
    // Aquí puedes inicializar los empleados, ya sea desde una API o datos predeterminados
    this.initializeEmployees();
  }

  private initializeEmployees() {
    // empleados de ejemplo
    this.employees = [
      {
        id: 1,
        surname: 'Perez',
        secondsurname: 'Montoya',
        firstname: 'Juan',
        othersName: 'Carlos',
        countryEmployment: 'Colombia',
        typeIdentification: 'Pasaporte',
        identificationnumber: '15211545',
        email: 'juan.perez@global.com.co',
        admissiondate: new Date(),
        area: 'Infraestructura'
      },
      {
        id: 2,
        surname: 'Garza',
        secondsurname: 'Martinez',
        firstname: 'Jose',
        othersName: 'Alberto',
        countryEmployment: 'USA',
        typeIdentification: 'Pasaporte',
        identificationnumber: '252458787',
        email: 'joseGarza@global.com.us',
        admissiondate: new Date(),
        area: 'Operación'
      },
    ];
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(employeeId: string): Employee | undefined {
    return this.employees.find(emp => emp.id === parseInt(employeeId));
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  editEmployee(employee: Employee) {
    const index = this.employees.findIndex(emp => emp.identificationnumber === employee.identificationnumber);
    if (index !== -1) {
      this.employees[index] = employee;
    }
  }

  deleteEmployee(employee: Employee) {
    const index = this.employees.findIndex(emp => emp.identificationnumber === employee.identificationnumber);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
  }
}
