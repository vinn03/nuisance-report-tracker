import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CreateReportComponent } from './components/create-report/create-report.component';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map.service';
import { VillainService } from './services/villain.service';
import { AddLocationMapComponent } from './components/add-location-map/add-location-map.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    CreateReportComponent,
    MapComponent,
    AddLocationMapComponent
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