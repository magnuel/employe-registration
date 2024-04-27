import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss'
})
export class EmployeeEditComponent implements OnInit {
  public employeeForm: FormGroup;
  public maxDate: string;
  public employeeId: string = '';
  public employee: Employee | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.maxDate = new Date().toISOString().split('T')[0];
    this.employeeForm = this.fb.group({
      surname: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      secondsurname: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      firstname: ['', [Validators.required, Validators.pattern('[A-Za-z]+')]],
      othersName: [''],
      countryEmployment: ['', Validators.required],
      typeIdentification: ['', Validators.required],
      identificationnumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      admissiondate: ['', Validators.required],
      area: ['', Validators.required],
      state: ['Activo'], // Valor predeterminado para el estado
    });
  }

  ngOnInit(): void {
    // Obtener el ID del empleado de los parámetros de la URL
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    // Obtener el empleado del servicio por su ID
    this.employee = this.employeeService.getEmployeeById(this.employeeId);
    // Si se encontró el empleado, inicializar el formulario con sus datos
    if (this.employee) {
      this.employeeForm.patchValue(this.employee);
    }
  }

  loadEmployeeData(): void {
    this.employee = this.employeeService.getEmployeeById(this.employeeId); // Obtener los datos del empleado del servicio
    if (this.employee) {
      this.employeeForm.patchValue(this.employee); // Establecer los valores del empleado en el formulario
    } else {
      console.error(`No se encontró ningún empleado con el ID ${this.employeeId}`);
    }
  }

  submitForm(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: Employee = this.employeeForm.value;
      // Realizar cualquier lógica adicional aquí, como regenerar la dirección de correo electrónico
      console.log('Datos del empleado actualizados:', updatedEmployee);
      // Limpiar el formulario después de guardar
      this.employeeForm.reset();
      // Redirigir a la página de inicio después de guardar
      this.router.navigateByUrl('home');
    } else {
      console.log('Formulario inválido. Por favor, verifica los campos.');
    }
  }

  goToEmployeeHome(): void {
    this.router.navigateByUrl('home');
  }

  generateEmail(firstName: string, lastName: string): string {
    // Generar dirección de correo electrónico en base a nombres y apellidos
    const email = `${firstName}.${lastName}@example.com`.toLowerCase();
    return email;
  }
}
