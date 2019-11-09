import { Component, OnInit } from "@angular/core";
import { FilmeService } from "src/app/services/filme.service";
import { Filme } from "src/app/models/filme";
import { Router } from "@angular/router";

@Component({
  selector: "app-filmes",
  templateUrl: "./filmes.component.html",
  styleUrls: ["./filmes.component.css"]
})
export class FilmesComponent implements OnInit {
  lista_filmes: Filme[];

  constructor(public filmeService: FilmeService, private router: Router) {}

  ngOnInit() {
    this.get5PopFilmes();
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

  filmeDetalhe(id: number) {
    this.router.navigate(["filme", id]);
  }
}
