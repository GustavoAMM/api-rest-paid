import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
// Importar módulo de PrimeNG
import { DialogModule } from 'primeng/dialog';


@NgModule({ declarations: [AppComponent],
    exports: [RouterModule],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        MessagesModule,
        BrowserAnimationsModule,
        DialogModule], providers: [MessageService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
