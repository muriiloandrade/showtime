import { Component, OnInit } from "@angular/core";
import { Resultado } from "./../../models/serie";
import { SerieService } from "src/app/services/serie.service";
import { Serie } from "src/app/models/serie";

@Component({
  selector: "app-series",
  templateUrl: "./series.component.html",
  styleUrls: ["./series.component.css"]
})
export class SeriesComponent implements OnInit {
  lista_series: Serie[];

  constructor(public serieService: SerieService) {}

  ngOnInit() {
    this.get5PopSeries();
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
        this.lista_series = response.results.slice(0, 5);
        console.log(response.results.slice(0, 5));
      },
      error => {
        console.log(error);
      }
    );
  }
}
