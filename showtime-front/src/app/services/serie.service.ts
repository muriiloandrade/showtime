import { Resultado } from "./../models/serie";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SerieService {
  private baseApiPath = "https://api.themoviedb.org/3";
  private getApiKey = "835003cab26ff0669db7cbcd0de43a6a";
  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  // GET
  getLatestSeries(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${this.baseApiPath}/tv/popular?api_key=${this.getApiKey}&language=pt_BR`
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }
  get5PopSeries(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${this.baseApiPath}/tv/popular?api_key=${this.getApiKey}&language=pt_BR&page=1`
      )
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
