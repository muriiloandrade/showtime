import { Resultado } from "./../models/livro";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private baseApiPath = "https://www.googleapis.com/books/v1";
  private linkteste ="https://www.googleapis.com/books/v1/volumes?q='search+terms'"

  private getApiKey = "AIzaSyC9nGLybxMviiKWZYL1aXDASpc0I-kiqDw";
  constructor(private http: HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  getAllLivros(): Observable<Resultado> {
    return this.http
      .get<Resultado>(
        //`${this.baseApiPath}//?api_key=${this.getApiKey}&language=pt_BR`
        `${this.linkteste}`
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  errorHandl(errorHandl: any): import("rxjs").OperatorFunction<Resultado, any> {
    throw new Error("Method not implemented.");
  }
}
