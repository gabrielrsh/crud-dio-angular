import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://sheet.best/api/sheets/4ecb7756-b195-4a87-843b-9f4cf9cb658e';

  // Ver httpInterceptors ex.: intercepta a chamada da Api adiciona o token e segue a chamada
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }) 
  }


  constructor(private httpClient: HttpClient) { }

  // Retorna a lista de usuarios
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Salva usuario
  postUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user, this.httpOptions);
  }

  // Deleta usuario
  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`);
  } 
}
