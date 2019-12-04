export interface Livro {
  volumeInfo: Infos;
}

export interface Resultado {
  items: Livro[];
}

export interface Infos {
  title: string;
  subtitle: string;
  authors: string[];
  categories: string[];
  description: string;
  imageLinks: imageLinks;
  publishedDate: number;
  publisher: string;
}

export interface imageLinks {
  smallThumbnail: string;
}
