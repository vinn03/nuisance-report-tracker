import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { VillainLocation } from '../../models/location.model';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.css'
})

export class CreateReportComponent implements OnInit {

  @Output() villainAdded = new EventEmitter<any>();
  @Output() formClosed = new EventEmitter<void>();

  villainForm: FormGroup;
  locationNames: string[] = [];

  constructor(private fb: FormBuilder,
              private locationsService: LocationsService,
              private mapService: MapService) {

    this.villainForm = this.fb.group({
      name: ['', Validators.required],
      reportee: ['', Validators.required],
      location: ['', Validators.required],
      info: ['', Validators.required],
      image: ['', this.validateImageUrl]
    });
  }

  validateImageUrl(control: FormControl): { [key: string]: any } | null {
    const imageUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;

    if (control.value && !imageUrlRegex.test(control.value)) {
      return { invalidImageUrl: true };
    }

    return null;
  }

  ngOnInit(): void {
    this.updateLocationOptions();
  }

  onSubmit(): void {
    if (this.villainForm.valid) {
      const locationName: string = this.villainForm.get('location')!.value;
      this.updateMap(locationName);
      this.villainAdded.emit(this.villainForm.value);
      this.villainForm.reset();
      location.reload();
    }
  }


  updateMap(locationName: string): void {
    const locations: VillainLocation[] = this.locationsService.getLocations();
    const location: VillainLocation = locations.find((location) => location.name === locationName)!;

    if (location.count > 0) { // update report count of existing marker
      location.count++;
      this.mapService.reloadMarkers();
      
    } 

    else { // add new marker to map and markers service
      location.count++;
      this.mapService.placeMarker(location.lat, location.lng, location.name, location.count);
    }

    this.locationsService.updateLocation(location);

  }

  updateLocationOptions(): void {
    const updatedLocations = this.locationsService.getLocations();

    if (updatedLocations.length > 0) {
      this.locationNames = [];
      for (const location of updatedLocations as VillainLocation[]) {
        this.locationNames.push(location.name);
      }
    }
  }
}

