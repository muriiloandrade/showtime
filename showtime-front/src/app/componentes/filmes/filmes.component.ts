import { Component, OnInit } from "@angular/core";
import { FilmeService } from "src/app/services/filme.service";
import { Filmes } from 'src/app/models/filme';

@Component({
  selector: "app-filmes",
  templateUrl: "./filmes.component.html",
  styleUrls: ["./filmes.component.css"]
})
export class FilmesComponent implements OnInit {
  lista_filmes:Filmes[];
  constructor(public filmeService: FilmeService) {}

  ngOnInit() {
    this.getFilmes();
  }
  getFilmes() {
    this.filmeService.getLatestFilmes().subscribe(
      data=>{
        const response = (data);
        this.lista_filmes=response.results;
        console.log(response.results)
      },error =>{
        console.log(error);
      }
    )
  }
}
