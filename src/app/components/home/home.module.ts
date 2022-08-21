import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormatCodePipe } from 'src/app/pipes/format-code.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    FormatCodePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
})
export class HomeModule { }
