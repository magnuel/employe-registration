export interface Employee {
    id?: number; // Opcional si tienes un identificador único para cada empleado
    surname: string;
    secondsurname: string;
    firstname: string;
    othersName?: string;
    countryEmployment: string;
    typeIdentification: string;
    identificationnumber: string;
    email: string;
    admissiondate: Date | undefined;
    area: string;
    state?: string; // Opcional si el estado se establece automáticamente
    registrationdate?: Date | undefined; // Opcional si la fecha de registro se establece automáticamente
    [key: string]: any; // se agrega esta propiedad para que exista la posibilidad de tener otras propiedades dinamicas en el model 
}
