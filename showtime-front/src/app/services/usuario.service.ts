import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  private api_url = "https://localhost:5555/user";

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  register(userData) {
    return this.http.post<any>(`${this.api_url}/register`, userData);
  }

  login(email: string, password: string, username: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password,
        username: username,
      };

      this.http.post(`${this.api_url}/login`, data).subscribe(
        (result: any) => {
          resolve(result.json());
        },
        error => {
          reject(error.json());
        }
      );
    });
  }
}
