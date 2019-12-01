import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimoniesComponent } from '../testimonies/testimonies.component';
import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, TestimoniesComponent],
  imports: [CommonModule, NgbModule],
  exports: [HomeComponent],
  providers: [],
})
export class HomeModule {}
