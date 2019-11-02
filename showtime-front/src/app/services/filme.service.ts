import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Filmes } from "../models/filme";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FilmeService {
  baseurl = "https://api.themoviedb.org/3/movie/";
  id = "475557";
  api_key = "835003cab26ff0669db7cbcd0de43a6a";
  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  // https://api.themoviedb.org/3/search/movie?api_key=835003cab26ff0669db7cbcd0de43a6a&language=pt_BR&query=estrelas
  // GET
  GetIssue(): Observable<Filmes> {
    return this.http
      .get<Filmes>("https://jsonplaceholder.typicode.com/users")
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
