import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CreateReportComponent } from './create-report/create-report.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    CreateReportComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}