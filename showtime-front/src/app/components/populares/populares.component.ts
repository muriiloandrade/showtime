import { Component, OnInit } from '@angular/core';
import { FilmeService } from 'src/app/services/filme.service';
import { Router } from '@angular/router';
import { Filme } from 'src/app/models/Filme';
import { SerieService } from 'src/app/services/serie.service';
import { Resultado, Serie } from 'src/app/models/Serie';

@Component({
  selector: 'app-populares',
  templateUrl: './populares.component.html',
  styleUrls: ['./populares.component.scss'],
})
export class PopularesComponent implements OnInit {
  lista_filmes: Filme[];
  lista_series: Serie[];

  constructor(
    private filmeService: FilmeService,
    private serieService: SerieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.get5PopFilmes();
    this.get5PopSeries();
  }

  getFilmes() {
    this.filmeService.getLatestMovies().subscribe(
      data => {
        const response = data;
        this.lista_filmes = response.results;
        console.log(response.results);
      },
      error => {
        console.log(error);
      }
    );
  }

  get5PopFilmes() {
    this.filmeService.get5PopMovies().subscribe(
      data => {
        const response = data;
        this.lista_filmes = response.results.slice(0, 4);
        console.log(response.results.slice(0, 4));
      },
      error => {
        console.log(error);
      }
    );
  }

  filmeDetalhe(id: number) {
    this.router.navigate(['filme', id]);
  }

  getSeries() {
    this.serieService.getLatestSeries().subscribe(
      data => {
        const response = data as Resultado;
        this.lista_series = response.results;
        console.log(response.results);
      },
      error => {
        console.log(error);
      }
    );
  }
  get5PopSeries() {
    this.serieService.get5PopSeries().subscribe(
      data => {
        const response = data;
        this.lista_series = response.results.slice(0, 4);
        console.log(response.results.slice(0, 4));
      },
      error => {
        console.log(error);
      }
    );
  }
}
