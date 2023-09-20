import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Importamos el módulo HttpClientModule
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    // Agregamos el servicio ApiService
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
