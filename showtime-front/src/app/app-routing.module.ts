import { LivrosComponent } from './componentes/livros/livros.component';
import { SeriesComponent } from "./componentes/series/series.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FilmesComponent } from "./componentes/filmes/filmes.component";
import { RegisterComponent } from "./componentes/register/register.component";
import { HomeComponent } from "./componentes/home/home.component";
import { LoginComponent } from "./componentes/login/login.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "serie", component: SeriesComponent },
  { path: "cadastrar", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "filme", component: FilmesComponent },
  { path: "livro", component: LivrosComponent },


  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const RoutingComponents = [
  FilmesComponent,
  SeriesComponent,
  RegisterComponent,
  HomeComponent,
  LoginComponent,
  LivrosComponent
];
