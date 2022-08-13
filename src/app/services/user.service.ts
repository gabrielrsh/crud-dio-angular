import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUrl = 'https://sheet.best/api/sheets/4ecb7756-b195-4a87-843b-9f4cf9cb658e';

  constructor(private httpClient: HttpClient) { }

  // Retorna a lista de usuarios
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this._apiUrl);
  }
}
