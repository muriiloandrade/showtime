import { Component, OnInit } from '@angular/core';
import { FilmeDetalhe, Cast, Filme } from 'src/app/models/Filme';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.scss'],
})
export class MoviedetailsComponent implements OnInit {
  filme_detalhe: FilmeDetalhe;
  filme_casting: Cast[];
  lista_filmes: Filme[];
  id: number;
  currentRate = 6;

  constructor(
    private filmeService: FilmeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMovieDetails();
    this.get5CastingFilmes();
    this.getFilmeRecomend();
  }

  getMovieDetails() {
    this.id = this.route.snapshot.params['id'];

    this.filmeService.getMovieDetails(this.id).subscribe(
      data => {
        this.filme_detalhe = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  get5CastingFilmes() {
    this.id = this.route.snapshot.params['id'];

    this.filmeService.getCastDetails(this.id).subscribe(
      data => {
        const response = data;
        this.filme_casting = response.cast.slice(0, 6);
        console.log(response.cast.slice(0, 6));
      },
      error => {
        console.log(error);
      }
    );
  }

  getFilmeRecomend() {
    this.id = this.route.snapshot.params['id'];

    this.filmeService.getMoviesRecomend(this.id).subscribe(
      data => {
        const response = data;
        this.lista_filmes = response.results.slice(0, 8);
        console.log(response.results);
      },
      error => {
        console.log(error);
      }
    );
  }
}
