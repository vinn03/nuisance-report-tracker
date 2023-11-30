import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { CreateReportComponent } from './components/create-report/create-report.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { AddLocationMapComponent } from './components/add-location-map/add-location-map.component';

const appRoutes: Routes = [
    { path: 'map', component: MapComponent },
    { path: 'data-table', component: DataTableComponent },
    { path: 'create-report', component: CreateReportComponent },
    { path: 'more-info', component: MoreInfoComponent },
    { path: 'add-location-map', component: AddLocationMapComponent },
    { path: '', redirectTo: '/map', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
