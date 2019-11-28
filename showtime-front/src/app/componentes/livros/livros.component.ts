import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { Livro } from 'src/app/models/livro';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css'],
})
export class LivrosComponent implements OnInit {
  lista_livros: Livro[];

  constructor(public livroService: LivroService) {}

  ngOnInit() {
    this.getLivros();
  }

  getLivros() {
    this.livroService.getAllLivros().subscribe(
      data => {
        const response = data;
        this.lista_livros = response.items;
        console.log(response.items);
      },
      error => {
        console.log(error);
      }
    );
  }
}
