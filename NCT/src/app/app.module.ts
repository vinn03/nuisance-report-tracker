import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CreateReportComponent } from './components/create-report/create-report.component';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map.service';
import { VillainService } from './services/villain.service';
import { AddLocationMapComponent } from './components/add-location-map/add-location-map.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { MarkersService } from './services/markers.service';
import { LocationsService } from './services/locations.service';
import { DeleteComponent } from './components/delete/delete.component';


@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    CreateReportComponent,
    MapComponent,
    AddLocationMapComponent,
    MoreInfoComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [MapService, VillainService, MarkersService, LocationsService],
  bootstrap: [AppComponent],
})
export class AppModule {}