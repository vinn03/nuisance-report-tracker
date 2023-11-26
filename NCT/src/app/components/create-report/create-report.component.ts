import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { VillainLocation } from '../../models/location.model';
import { MapService } from '../../services/map.service';
import { MarkersService } from '../../services/markers.service';
import { MarkerInfo } from '../../models/marker-info.model';
import { LatLng, Marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css'
})

export class CreateReportComponent {

  @Output() villainAdded = new EventEmitter<any>();
  @Output() formClosed = new EventEmitter<void>();

  villainForm: FormGroup;
  showForm:boolean = false;
  locationNames: string[] = [];
  
  constructor(private fb: FormBuilder,
              private locationsService: LocationsService,
              private mapService: MapService,
              private markersService: MarkersService) {

    this.villainForm = this.fb.group({
      name: ['', Validators.required],
      reportee: ['', Validators.required],
      location: ['', Validators.required],
      time: ['', Validators.required],
      info: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.villainForm.valid) {

      const locationName:string = this.villainForm.get('location')!.value;
      this.updateMap(locationName);
      
      this.villainAdded.emit(this.villainForm.value);
      this.villainForm.reset();
    }
  }


  updateMap(locationName: string): void {
    const locations: VillainLocation[] = this.locationsService.getLocations();
    const location: VillainLocation = locations.find((location) => location.name === locationName)!;

    const markers: MarkerInfo[] = this.markersService.getMarkers();
    const existingMarker: MarkerInfo | undefined= markers.find((marker) => marker.markerName === locationName);

    if (existingMarker) { // update report count of existing marker
    
      this.markersService.addCount(locationName);
      const markerObject: MarkerInfo = markers.find((marker) => marker.markerName === locationName)!;
      const marker: Marker = markerObject.marker;
      this.mapService.removeMarker(marker);
      this.mapService.placeMarker(marker, locationName, markerObject.markerCount);
      
    } 

    else { // add new marker to map and markers service

      const coordinates: string[] = location.coordinates.split(' ');
      const latLng: LatLng = new L.LatLng(parseFloat(coordinates[0]), parseFloat(coordinates[1]));
      const marker = new Marker(latLng);
      this.markersService.addMarker(marker, locationName);

      const markerCount: number = this.markersService.getCount(locationName);
      this.mapService.placeMarker(marker, locationName, markerCount);
    }

  }

  closeForm(): void {
    this.formClosed.emit();
  }

  updateOptions(): void {
    // Assuming you have a LocationsService injected and available
    const updatedLocations = this.locationsService.getLocations();

    if (updatedLocations.length > 0) {

      // Clear the list of location names
      this.locationNames = [];

      // Append each location name to the options
      for (const location of updatedLocations as VillainLocation[]) {
        this.locationNames.push(location.name);
      }
    }
  }
}

