import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatButtonModule
} from "@angular/material";

@NgModule({
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
