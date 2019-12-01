import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Resultado, FilmeDetalhe, FilmeCasting } from '../models/Filme';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilmeService {
  constructor(private http: HttpClient) {}

  // GET
  getLatestMovies(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${environment.tmdbapi}/movie/popular?api_key=${environment.tmdbkey}&language=pt_BR`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  getMovieDetails(filme_id): Observable<FilmeDetalhe> {
    return this.http
      .get<FilmeDetalhe>(
        `${environment.tmdbapi}/movie/${filme_id}?api_key=${environment.tmdbkey}&language=pt_BR`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  getCastDetails(filme_id): Observable<FilmeCasting> {
    return this.http
      .get<FilmeCasting>(
        `${environment.tmdbapi}/movie/${filme_id}/credits?api_key=${environment.tmdbkey}&language=pt_BR`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  // Get
  get5PopMovies(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${environment.tmdbapi}/movie/popular?api_key=${environment.tmdbkey}&language=pt_BR&page=1`
      )
      .pipe(retry(1), catchError(this.errorHandle));
  }

  getMoviesRecomend(filme_id): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        `${environment.tmdbapi}/movie/${filme_id}/recommendations?api_key=${environment.tmdbkey}&language=pt_BR`
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
