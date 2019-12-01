import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Resultado } from '../models/Serie';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SerieService {
  constructor(private http: HttpClient) {}

  // GET
  getLatestSeries(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${environment.tmdbapi}/tv/popular?api_key=${environment.tmdbkey}&language=pt_BR`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }
  get5PopSeries(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${environment.tmdbapi}/tv/popular?api_key=${environment.tmdbkey}&language=pt_BR&page=1`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  // Error handling
  errorHandle(error) {
    let errorMessage = '';
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
