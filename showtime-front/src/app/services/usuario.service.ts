import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private api_url = 'https://localhost:5555/user';

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  register(usuario: Usuario) {
    return this.http.post<any>(`${this.api_url}/register`, usuario);
  }

  login(usuario: Usuario) {
    return this.http.post<any>(`${this.api_url}/login`, usuario);
  }
}
