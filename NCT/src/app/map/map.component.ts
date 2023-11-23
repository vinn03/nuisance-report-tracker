import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  
    private map!: L.Map;

    constructor() {
    }

    ngOnInit(): void {
      this.showMap();
      this.map.on('click', this.addMarker.bind(this));
    }

    showMap(): void {
      this.map = L.map('mapid').setView([49.27, -123], 11);

      const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
    }

    addMarker(e: L.LeafletMouseEvent): void {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    }

    
}
