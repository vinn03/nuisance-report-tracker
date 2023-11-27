import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { VillainLocation } from '../../models/location.model';
import { MapService } from '../../services/map.service';
import { MarkersService } from '../../services/markers.service';
import { MarkerInfo } from '../../models/marker.model';
import { LatLng, Marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css'
})

export class CreateReportComponent implements OnInit {

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

  ngOnInit(): void {
    this.updateLocationOptions();
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

    if (location.count > 0) { // update report count of existing marker
      location.count++;
      console.log(markers);
      console.log(location.name);
      this.mapService.reloadMarkers();
      // const marker: Marker = markers.find((marker) => marker.markerName === location.name)!.marker;
      // this.mapService.removeMarker(marker);
      // this.mapService.placeMarker(location.lat, location.lng, location.name, location.count);
      console.log("Count is now: ", location.count);
      
    } 

    else { // add new marker to map and markers service
      location.count++;
      const newMarker = this.mapService.placeMarker(location.lat, location.lng, location.name, location.count);
      this.markersService.addMarker(newMarker, location.name);
      console.log("Count is now: ", location.count);
    }

    this.locationsService.updateLocation(location);

  }

  closeForm(): void {
    this.formClosed.emit();
  }

  updateLocationOptions(): void {
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

