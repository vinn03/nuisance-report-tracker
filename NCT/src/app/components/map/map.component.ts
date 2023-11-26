import { Component, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Map, LatLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  
    private map!: Map;
    
    constructor(private mapService: MapService) { }

    ngAfterViewInit(): void {

      this.map = new Map('mapid').setView([49.27, -123], 11);

      this.mapService.setMap(this.map);

      const tiles = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

    }
}
