import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule],
  exports: [MatCardModule, MatFormFieldModule, MatSelectModule]
})
export class MaterialModule {}
