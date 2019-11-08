import { NgModule } from "@angular/core";
import { MzButtonModule, MzInputModule } from 'ngx-materialize';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    MzButtonModule,
    MzInputModule,
  ],
  exports: [
    CommonModule,
    MzButtonModule,
    MzInputModule,
  ],
})
export class MaterializeModule { }