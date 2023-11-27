import { Component, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { LocationsService } from '../../services/locations.service';
import { Map, LatLng, tileLayer, Marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  
    private map!: Map;
    
    constructor(private mapService: MapService, private locationsService: LocationsService ){}

    ngAfterViewInit(): void {
      this.initMap();
      this.loadMarkers
    }

    private initMap(): void {
      console.log("Initializing map...")
      this.map = new Map('mapid').setView([49.27, -123], 11);

      this.mapService.setMap(this.map);

      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
      
    }

    private loadMarkers(): void {
      this.locationsService.getLocationsObservable().subscribe(locations => {
        this.mapService.initMarkers();
      });
    }

    reloadMarkers(): void {
      this.mapService.reloadMarkers();
    }

}
