import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DataTableComponent } from './data-table/data-table.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { AddLocationComponent } from './add-location/add-location.component';

const appRoutes: Routes = [
    { path: 'map', component: MapComponent },
    { path: 'data-table', component: DataTableComponent },
    { path: 'create-report', component: CreateReportComponent },
    { path: 'more-info', component: MoreInfoComponent },
    { path: 'add-location', component: AddLocationComponent },
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
