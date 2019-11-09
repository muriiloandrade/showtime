import { Resultado, FilmeDetalhe, FilmeCasting } from "./../models/filme";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FilmeService {
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
  getLatestFilmes(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${this.baseApiPath}/movie/popular?api_key=${this.getApiKey}&language=pt_BR`
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getFilmeDetalhe(filme_id): Observable<FilmeDetalhe> {
    return this.http
      .get<FilmeDetalhe>(
        `${this.baseApiPath}/movie/${filme_id}?api_key=${this.getApiKey}&language=pt_BR`
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getCastDetalhe(filme_id): Observable<FilmeCasting> {
    return this.http
      .get<FilmeCasting>(
        `${this.baseApiPath}/movie/${filme_id}/credits?api_key=${this.getApiKey}&language=pt_BR`
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Get
  get5PopFilmes(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${this.baseApiPath}/movie/popular?api_key=${this.getApiKey}&language=pt_BR&page=1`
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  getFilmeRecomend(filme_id): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${this.baseApiPath}/movie/${filme_id}/recommendations?api_key=${this.getApiKey}&language=pt_BR`
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
