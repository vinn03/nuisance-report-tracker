import { Component, AfterViewInit } from '@angular/core';
import { MapService } from '../services/map.service';
import { Map, LatLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  
    private map!: Map;
    private marker: L.Marker | undefined; 

    constructor(private mapService: MapService) { }

    ngAfterViewInit(): void {

      this.map = new Map('mapid').setView([49.27, -123], 11);

      const tiles = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);


      this.map.on('click', (e) => {

        if (this.marker) {
          this.map.removeLayer(this.marker); // Remove existing marker
        }

        const latlng: LatLng = e.latlng;
        this.marker = L.marker(latlng).addTo(this.map);

        const selectedLocation = `(${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)})`;
        this.mapService.setMarkerCoordinates(selectedLocation);
      });

    }
}
