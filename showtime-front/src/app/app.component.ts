import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private title: Title, private meta: Meta) {
    title.setTitle('Showtime - Organize seu lazer!');
    meta.addTag({
      name: 'description',
      content:
        'Uma plataforma para organizar todas as suas formas de entretenimento!',
    });
    meta.addTag({
      name: 'author',
      content: 'Emanuel Bessa, Murilo Andrade, Rainan Gramacho',
    });
    meta.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    });
  }
}
