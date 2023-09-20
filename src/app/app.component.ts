import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Creando un objeto para cada respuesta en el template
  // Tipifiquen! (agreguen los tipos de datos)
  nuevoDatoGet: any = { id: '' };
  nuevoDatoGetById: any = { id: '' };
  nuevoDatoPost: any = { nombre: '', edad: null };
  nuevoDatoPut: any = { id: '', nombre: '', edad: null };
  nuevoDatoDelete: any = { id: '' };
  datos: any[] = [];

  // Instanciamos el objeto ApiService
  constructor(private apiService: ApiService) {}

  // Llamamos a los métodos del servicio

  // Llamando método GET
  getDatos() {
    this.apiService.getDatos().subscribe((data) => {
      this.datos = data;
      console.log('Respuesta GET:', data);
    });
  }

  // Llamando método GET por ID
  getDatoPorId() {
    this.apiService.getDatoPorId(this.nuevoDatoGetById.id).subscribe((data) => {
      this.datos = [data];
      console.log('Respuesta GET por ID:', data);
    });
  }

  // Llamando método POST
  agregarDato() {
    this.apiService.agregarDato(this.nuevoDatoPost).subscribe((response) => {
      this.getDatos();
      this.nuevoDatoPost = { nombre: '', edad: null };
      console.log('Respuesta POST:', response);
    });
  }

  // Llamando método PUT
  actualizarDato() {
    this.apiService.actualizarDato(this.nuevoDatoPut.id, this.nuevoDatoPut).subscribe((response) => {
      this.getDatos();
      console.log('Respuesta PUT:', response);
    });
  }

  // Llamando método DELETE
  eliminarDato() {
    this.apiService.eliminarDato(this.nuevoDatoDelete.id).subscribe((response) => {
      this.getDatos();
      console.log('Respuesta DELETE:', response);
    });
  }
}
