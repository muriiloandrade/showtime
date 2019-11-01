import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BootstrapModule } from "./bootstrap";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BootstrapModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
