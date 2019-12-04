import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { PopularesModule } from './components/populares/populares.module';
import { MoviedetailsComponent } from './components/moviedetails/moviedetails.component';
import { SignupModule } from './components/signup/signup.module';
import { SeriedetailsComponent } from './components/seriedetails/seriedetails.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LivroComponent } from './components/livro/livro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MoviedetailsComponent,
    SeriedetailsComponent,
    ProfileComponent,
    LivroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HomeModule,
    LoginModule,
    PopularesModule,
    SignupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
