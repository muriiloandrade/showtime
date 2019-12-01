import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularesComponent } from './populares.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PopularesComponent],
  imports: [CommonModule, NgbModule],
})
export class PopularesModule {}
