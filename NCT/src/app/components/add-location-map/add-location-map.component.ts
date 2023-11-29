import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from '../../services/map.service';
import { LocationsService } from '../../services/locations.service';
import { VillainLocation } from '../../models/location.model';
import { Map, LatLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-location-map',
  templateUrl: './add-location-map.component.html',
  styleUrl: './add-location-map.component.css'
})
export class AddLocationMapComponent implements AfterViewInit {
  
    private map!: Map;
    private marker: L.Marker | undefined; 

    @Output() locationAdded = new EventEmitter<any>();
    @Output() formClosed = new EventEmitter<void>();
    locationForm: FormGroup;

    constructor(private mapService: MapService,
                private locationsService: LocationsService,
                private fb:FormBuilder,
                private router:Router) { 

      this.locationForm = this.fb.group({
        name: ['', Validators.required],
      });
    }

    ngAfterViewInit(): void {

      this.map = new Map('mapid-2').setView([49.27, -123], 11);

      const tiles = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);


      this.map.on('click', (e) => {

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        const latlng: LatLng = e.latlng;
        this.marker = L.marker(latlng).addTo(this.map);

        const selectedLocation = `(${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)})`;
        this.mapService.setMarkerCoordinates(selectedLocation);
      });

    }

    onSubmit(): void {
      var coordinates:string | null = this.mapService.getMarkerCoordinates();

      if (this.locationForm.valid && (coordinates != null)) {

        coordinates = coordinates.replace(/[()]/g, '');
        const coordinatesArray:string[] = coordinates.split(', ');
        const lat = parseFloat(coordinatesArray[0]);
        const lng = parseFloat(coordinatesArray[1]);
        const name: string = this.locationForm.get('name')!.value.trim();

        const isNameExists:boolean = this.locationsService.getLocations().some(location => location.name === name);

        if (isNameExists) {
          alert("Location name already exists. Please enter a different name.");
          return;
        }

        this.locationAdded.emit(this.locationForm.value);

        const newLocation: VillainLocation = {
          name: name,
          lat: lat,
          lng: lng,
          count: 0
        };

        this.locationsService.addLocation(newLocation);

        this.locationForm.reset();
        this.router.navigate(['/map']);
      } 
      
      else {
        alert("Please select a location on the map.");
        return;
      }
    }
}