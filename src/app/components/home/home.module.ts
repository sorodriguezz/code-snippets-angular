import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClipboardModule,
    DataTablesModule,
  ],
})
export class HomeModule { }
