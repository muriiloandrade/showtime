import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { Livro, Resultado } from 'src/app/models/Livro';

@Component({
  selector: 'app-livro',
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.scss'],
})
export class LivroComponent implements OnInit {
  public lista_livros: Livro[];
  public focus: boolean;

  constructor(public livroService: LivroService) {}

  ngOnInit() {
    this.getLivros();
  }

  getLivros() {
    this.livroService.getSearchedLivros().subscribe(
      data => {
        const response = data;
        this.lista_livros = response.items.slice(0, 8);
        console.log(response.items);
      },
      error => {
        console.log(error);
      }
    );
  }
}
