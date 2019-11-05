import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule, RoutingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FilmeService } from "./services/filme.service";
import { RegisterComponent } from "./componentes/register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { AlertComponent } from './componentes/alert/alert/alert.component';

@NgModule({
  declarations: [AppComponent, RoutingComponents, RegisterComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  entryComponents: [RegisterComponent],
  providers: [FilmeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
