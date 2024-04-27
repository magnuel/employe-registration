import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})

export class EmployeeFormComponent {
  public employeeForm: FormGroup;
  maxDate: string; // definir la fecha máxima de ingreso

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.maxDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato ISO
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
      registrationdate: [this.getCurrentDateTime()]
    });
  }
  submitForm() {
    // Verificar si el formulario es válido antes de enviar
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value; // Obtener los datos del formulario
      console.log('Datos del employee:', employee);
      // Limpia el formulario después de enviar
      this.employeeForm.reset();
    } else {
      // Si el formulario no es válido, muestra un mensaje de error o realiza otras acciones necesarias
      console.log('Formulario inválido. Por favor, verifica los campos.');
    }
  }
  goToEmployeeHome() {
    this.router.navigateByUrl('home');
  }
  getCurrentDateTime(): string {
    // Función para obtener la fecha y hora actual en formato DD/MM/YYYY HH:mm:ss
    const currentDateTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',', '');
    return currentDateTime;
  }
}
