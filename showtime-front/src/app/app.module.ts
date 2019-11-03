import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule, RoutingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BootstrapModule } from "./bootstrap";
import { FilmeService } from "./services/filme.service";
import { RegisterComponent } from './componentes/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent,RoutingComponents, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, BootstrapModule, HttpClientModule,ReactiveFormsModule],
  providers: [FilmeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
