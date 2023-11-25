
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  private locations: object[] = [];

  constructor() { }

  addLocation(coordinates: string, name: string): void {
    const location = {
        coordinates: coordinates,
        name: name
    }
    this.locations.push(location);
  }

  getLocations(): object[] {
    return this.locations;
  }
}
