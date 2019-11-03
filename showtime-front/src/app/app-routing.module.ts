import { SeriesComponent } from './componentes/series/series.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesComponent } from './componentes/filmes/filmes.component';
import { RegisterComponent } from './componentes/register/register.component';


const routes: Routes = [
  { path: '', component: FilmesComponent },
  { path: 'serie', component: SeriesComponent },
  { path: 'cadastrar', component:  RegisterComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  FilmesComponent,
  SeriesComponent,
  RegisterComponent
]