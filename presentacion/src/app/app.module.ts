import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
// Importar módulo de PrimeNG
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    BrowserAnimationsModule,
    DialogModule
  ],
  exports: [RouterModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
