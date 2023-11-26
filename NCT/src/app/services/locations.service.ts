import { Injectable } from '@angular/core';
import { VillainLocation } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  private locations: VillainLocation[] = [];

  constructor() { }

  addLocation(location: VillainLocation): void {
    this.locations.push(location);
  }

  getLocations(): VillainLocation[] {
    return this.locations;
  }
}
