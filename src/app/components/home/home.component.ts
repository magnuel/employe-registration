import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public employees: Employee[]; // Debes obtener esta lista de empleados de donde los estés almacenando
  public filteredEmployees: Employee[]; // Lista de empleados filtrados
  public filters: any = {}; // Objeto para almacenar los filtros aplicados
  public currentPage: number = 1; // Página actual
  public itemsPerPage: number = 10; // Número de empleados por página
  public searchTerm: string = '';


  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {
    // Aquí se puede inicializar la lista de empleados, por ejemplo, desde una API
    this.employees = this.employeeService.getEmployees(); // llamar la lista de empleados desde el servicio
    this.filteredEmployees = [...this.employees]; // Inicialmente, los empleados filtrados son los mismos que todos los empleados
  }
  // Ir al componente EmployeeForm
  goToEmployeeForm() {
    this.router.navigateByUrl('registeremployee');
  }
  // Aplicar filtros
  applyFilters() {
    this.filteredEmployees = this.employees.filter(employee => {
        for (const key in employee) {
            if (Object.prototype.hasOwnProperty.call(employee, key)) {
                if (this.searchTerm && employee[key] && employee[key].toString().toLowerCase().includes(this.searchTerm.toLowerCase())) {
                    return true;
                }
            }
        }
        return false;
    });
}
  // Paginación: Ir a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  // Paginación: Ir a la página siguiente
  nextPage() {
    const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  // Función para editar un empleado
  editEmployee(employee: Employee) {
    this.router.navigateByUrl(`/editemployee/${employee.id}`);
  }

  // Función para confirmar eliminación de un empleado
  confirmDelete(employee: Employee) {
    const confirmDelete = window.confirm('¿Está seguro de que desea eliminar el empleado?');
    if (confirmDelete) {
      this.employeeService.deleteEmployee(employee);
      this.filteredEmployees = this.filteredEmployees.filter(emp => emp !== employee);
    }
  }
}
