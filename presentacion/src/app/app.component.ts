import { Component, ChangeDetectorRef } from '@angular/core';
import { UserInsertService } from './createuser.service';
import { Message } from 'primeng/api';
import { SaveUserResponse } from './save-user-response.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'presentacion';
  nick_name = '';
  full_name = '';
  messages: Message[] = [];
  users: any[] = [];
  displayModal: boolean = false;

  constructor(
    private userInsertService: UserInsertService,
    private cdr: ChangeDetectorRef
  ) {}

  public onSubmit() {
    if (this.nick_name.trim() === '' || this.full_name.trim() === '') {
      this.messages = [
        {
          severity: 'warn',
          summary: 'warning',
          detail: 'Campos vacíos',
        },
      ];
      this.cdr.detectChanges();
      return;
    }

    const formData = new FormData();
    formData.append('nick_name', this.nick_name);
    formData.append('full_name', this.full_name);

    this.userInsertService.postFormData(formData).subscribe(
      (success: SaveUserResponse) => {
        console.log(success);
        if (success.status === 'success') {
          this.messages = [
            {
              severity: 'success',
              summary: 'Éxito',
              detail: 'Registro exitoso',
            },
          ];
          this.cdr.detectChanges();
          this.nick_name = '';
          this.full_name = '';
        } else {
          this.messages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo completar el registro',
            },
          ];
          this.cdr.detectChanges();
        }
      },
      (error) => {
        this.messages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: 'Error en el servidor',
          },
        ];
        this.cdr.detectChanges();
      }
    );
  }

  public getDatos() {
    this.userInsertService.getUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.displayModal = true;
      },
      (error) => {
        this.messages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: 'Error en el servidor',
          },
        ];
      }
    );
  }
}
