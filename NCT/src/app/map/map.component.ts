import { Component, AfterViewInit } from '@angular/core';
import { MapService } from './map.service';
import { AddLocationService } from '../add-location/add-location.service';
import { Map, LatLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  
    private map!: Map;

    constructor(private locationService: AddLocationService) { }

    ngAfterViewInit(): void {

      this.map = new Map('mapid').setView([49.27, -123], 11);
      let marker: L.Marker;

      const tiles = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);


      this.map.on('click', (e) => {

        if (marker) {
          this.map.removeLayer(marker); // Remove existing marker
        }

        const latlng: LatLng = e.latlng;
        marker = L.marker(latlng).addTo(this.map);

        const selectedLocation = `Custom Location (${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)})`;
        this.locationService.addLocation(selectedLocation);
        
      });

    }

}
