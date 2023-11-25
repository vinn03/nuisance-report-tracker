
import { Injectable } from '@angular/core';
import { VillainLocation } from '../location.model';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  private locations: VillainLocation[] = [];

  constructor() { }

  addLocation(location: VillainLocation): void {
    this.locations.push(location);
  }

  getLocations(): object[] {
    return this.locations;
  }
}
