import { Component, OnInit } from '@angular/core';
import { SerieDetalhe, Cast, Serie } from 'src/app/models/Serie';
import { SerieService } from 'src/app/services/serie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seriedetails',
  templateUrl: './seriedetails.component.html',
  styleUrls: ['./seriedetails.component.scss'],
})
export class SeriedetailsComponent implements OnInit {
  serie_detalhe: SerieDetalhe;
  serie_casting: Cast[];
  lista_series: Serie[];
  id: number;
  currentRate = 6;

  constructor(
    private serieService: SerieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSerieDetails();
    this.get5CastingSeries();
    this.getSerieRecomend();
  }

  getSerieDetails() {
    this.id = this.route.snapshot.params['id'];

    this.serieService.getSerieDetails(this.id).subscribe(
      data => {
        this.serie_detalhe = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  get5CastingSeries() {
    this.id = this.route.snapshot.params['id'];

    this.serieService.getCastDetails(this.id).subscribe(
      data => {
        const response = data;
        this.serie_casting = response.cast.slice(0, 6);
        console.log(response.cast.slice(0, 6));
      },
      error => {
        console.log(error);
      }
    );
  }

  getSerieRecomend() {
    this.id = this.route.snapshot.params['id'];

    this.serieService.getSeriesRecomend(this.id).subscribe(
      data => {
        const response = data;
        this.lista_series = response.results.slice(0, 8);
        console.log(response.results);
      },
      error => {
        console.log(error);
      }
    );
  }
}
