import { Component, OnInit } from "@angular/core";
import { Filme } from "src/app/models/filme";
import { FilmeService } from "src/app/services/filme.service";
import { Serie } from "src/app/models/serie";
import { SerieService } from "src/app/services/serie.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  lista_filmes: Filme[];
  lista_series: Serie[];
  constructor(
    public filmeService: FilmeService,
    public serieService: SerieService
  ) {}

  ngOnInit() {
    this.get5PopFilmes();
    this.get5PopSeries();
  }

  getFilmes() {
    this.filmeService.getLatestFilmes().subscribe(
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
    this.filmeService.get5PopFilmes().subscribe(
      data => {
        const response = data;
        this.lista_filmes = response.results.slice(0, 5);
        console.log(response.results.slice(0, 5));
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
        this.lista_series = response.results.slice(0, 5);
        console.log(response.results.slice(0, 5));
      },
      error => {
        console.log(error);
      }
    );
  }
}
