import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Resultado, SerieDetalhe, SerieCasting } from '../models/Serie';
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

  getSerieDetails(serie_id): Observable<SerieDetalhe> {
    return this.http
      .get<SerieDetalhe>(
        `${environment.tmdbapi}/tv/${serie_id}?api_key=${environment.tmdbkey}&language=pt_BR`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  getCastDetails(serie_id): Observable<SerieCasting> {
    return this.http
      .get<SerieCasting>(
        `${environment.tmdbapi}/tv/${serie_id}/credits?api_key=${environment.tmdbkey}&language=pt_BR`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  getSeriesRecomend(series_id): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${environment.tmdbapi}/tv/${series_id}/recommendations?api_key=${environment.tmdbkey}&language=pt_BR`
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
