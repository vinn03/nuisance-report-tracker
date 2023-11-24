import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { VillainService } from './villain.service';
import { AddLocationComponent } from './add-location/add-location.component';
import { MoreInfoComponent } from './more-info/more-info.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    CreateReportComponent,
    MapComponent,
    AddLocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [MapService, VillainService],
  bootstrap: [AppComponent],
})
export class AppModule {}