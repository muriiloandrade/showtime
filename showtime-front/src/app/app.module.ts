import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule, RoutingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BootstrapModule } from "./bootstrap";
import { FilmeService } from "./services/filme.service";


@NgModule({
  declarations: [AppComponent,RoutingComponents],
  imports: [BrowserModule, AppRoutingModule, BootstrapModule, HttpClientModule],
  providers: [FilmeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
