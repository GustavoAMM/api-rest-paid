import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaveUserResponse } from './save-user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UserInsertService {
  constructor(private http: HttpClient) {}

  postFormData(formData: any): Observable<SaveUserResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<SaveUserResponse>('http://localhost:8000/users', formData);
  }
  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/getusers');
  }
}
