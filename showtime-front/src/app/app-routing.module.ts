import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopularesComponent } from './components/populares/populares.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { SeriedetailsComponent } from './components/seriedetails/seriedetails.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'populares', component: PopularesComponent },
  { path: 'filme/:id', component: MoviedetailsComponent },
  { path: 'serie/:id', component: SeriedetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
