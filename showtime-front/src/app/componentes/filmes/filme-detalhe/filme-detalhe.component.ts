import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FilmeService } from "src/app/services/filme.service";
import { FilmeDetalhe, Cast, Filme } from "src/app/models/filme";

@Component({
  selector: "app-filme-detalhe",
  templateUrl: "./filme-detalhe.component.html",
  styleUrls: ["./filme-detalhe.component.css"]
})
export class FilmeDetalheComponent implements OnInit {
  filme_detalhe: FilmeDetalhe;
  filme_casting: Cast[];
  lista_filmes: Filme[];
  id: number;
  constructor(
    public filmeService: FilmeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getFilmeDetalhe();
    this.get5CastingFilmes();
    this.getFilmeRecomend();
  }

  getFilmeDetalhe() {
    this.id = this.route.snapshot.params["id"];

    this.filmeService.getFilmeDetalhe(this.id).subscribe(
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
    this.id = this.route.snapshot.params["id"];

    this.filmeService.getCastDetalhe(this.id).subscribe(
      data => {
        const response = data;
        this.filme_casting = response.cast.slice(0, 5);
        console.log(response.cast.slice(0, 5));
      },
      error => {
        console.log(error);
      }
    );
  }

  getFilmeRecomend() {
    this.id = this.route.snapshot.params["id"];

    this.filmeService.getFilmeRecomend(this.id).subscribe(
      data => {
        const response = data;
        this.lista_filmes = response.results.slice(0, 7);
        console.log(response.results);
      },
      error => {
        console.log(error);
      }
    );
  }
}
