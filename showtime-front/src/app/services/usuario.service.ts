import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  constructor(private http: HttpClient) {}

  signup(usuario: Usuario) {
    return this.http.post<any>(`${environment.ourapi}/user/register`, usuario);
  }

  login(usuario: Usuario) {
    return this.http.post<any>(`${environment.ourapi}/user/login`, usuario);
  }
}
