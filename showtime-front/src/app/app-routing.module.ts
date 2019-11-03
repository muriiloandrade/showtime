import { SeriesComponent } from './componentes/series/series.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesComponent } from './componentes/filmes/filmes.component';


const routes: Routes = [
  { path: '', component: FilmesComponent },
  { path: 'serie', component: SeriesComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  FilmesComponent,
  SeriesComponent
]